$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Letters only please");



$.extend($.validator.messages, {
    required: "Este campo es obligatorio.",
    digits: "Por favor, escribe sólo dígitos.",
    lettersonly: "Por favor, escribe solo letras",
    minlength: "Es necesario seleccionar al menos una clinica"
});


function strip(html) {

    html = html.replace(/<\/li><li>/g, ',');
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;

    return tmp.textContent || tmp.innerText || "";
}

$(document).ready(function() {
    function loadTable() {
        $('#doctores').dataTable({
            destroy: true,
            "language": {
                "url": "extra/spanish.json"
            },
            "processing": true,
            "serverSide": true,
            "ajax": "php/server_processing.php",
            "aoColumnDefs": [{
                    "mRender": function(data, type, full) {
                        return '<ul class="listaClinicas"><li class="elementClinicas">' + full[2] + '</li></ul>';
                    },
                    "aTargets": [2]
                }, {
                    "mRender": function(data, type, full) {
                        return '<button class="btn btn-warning editar" data-toggle="modal" data-clinicas="' + full[2] + '" data-target="#editar" data-doctor="' + full[0] + '" id="' + full[1] + '">Editar</button>';
                    },
                    "aTargets": [3]
                }, {
                    "mRender": function(data, type, full) {
                        return '<button class="btn btn-danger borrar" data-toggle="modal" data-target="#borrar" data-doctor="' + full[0] + '" id="' + full[1] + '">Borrar</button>';
                    },
                    "aTargets": [4]
                }

            ],
            "fnDrawCallback": function() {
                $(".editar").each(function() {
                    $(this).attr('data-clinicas', strip($(this).attr('data-clinicas')));
                });
            }
        });



    }

    loadTable();

    $('#nuevo').on('shown.bs.modal', function() {
        //$('#selectClinicas').load('php/getSelectClinicas.php');
        $('#selectClinicas').load("php/getSelectClinicas.php");
        $('#nombre').val('');
        $('#nColegiado').val('');
        $('#selectClinicas').val('');
    });


    $('#addDoctor').validate({
        rules: {
            nombre: {
                required: true,
                lettersonly: true
            },
            nColegiado: {
                digits: true
            },
            'selectClinicas[]': {
                required: true,
                minlength: 1
            }
        },
        submitHandler: function() {
            $.post("php/nuevo.php", {
                nombre: $('#addDoctor').find('#nombre').val(),
                nColegiado: $('#addDoctor').find('#nColegiado').val(),
                clinicas: $('#addDoctor').find('#selectClinicas').val()
            }, function(data) {
                $('#nuevo').modal('hide');

                if (data[0].estado == 0) {
                    $.growl({
                        style: 'notice',
                        location: 'br',
                        title: 'OK',
                        message: data[0].mensaje
                    });
                    loadTable();
                } else {
                    $.growl({
                        style: 'error',
                        location: 'br',
                        title: data[0].estado,
                        message: data[0].mensaje
                    });
                }
            }, 'json');
        }
    });

    $('#editDoctor').validate({
        rules: {
            nombre: {
                required: true,
                lettersonly: true
            },
            nColegiado: {
                digits: true
            },
            'selectClinicas[]': {
                required: true,
                minlength: 1
            }
        },
        submitHandler: function() {
            $.post("php/editar.php", {
                refId: $('#editDoctor').find('#refId').val(),
                nombre: $('#editDoctor').find('#nombre').val(),
                nColegiado: $('#editDoctor').find('#nColegiado').val(),
                clinicas: $('#editDoctor').find('#selectClinicas').val()
            }, function(data) {
                $('#editar').modal('hide');

                if (data[0].estado == 0) {
                    $.growl({
                        style: 'notice',
                        location: 'br',
                        title: 'OK',
                        message: data[0].mensaje
                    });
                    loadTable();
                } else {
                    $.growl({
                        style: 'error',
                        location: 'br',
                        title: data[0].estado,
                        message: data[0].mensaje
                    });
                }
            }, 'json');
        }
    });