 'use strict';

$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-z]+$/i.test(value);
}, "Solo letras por favor");


var idDoctor;


   $(document).ready(function() {



     
       var miTabla = $('#miTabla').DataTable({
           'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar_vclinicas_mejor.php',
           'language': {
               'sProcessing': 'Procesando...',
               'sLengthMenu': 'Mostrar _MENU_ registros',
               'sZeroRecords': 'No se encontraron resultados',
               'sEmptyTable': 'Ningún dato disponible en esta tabla',
               'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
               'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
               'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
               'sInfoPostFix': '',
               'sSearch': 'Buscar:',
               'sUrl': '',
               'sInfoThousands': ',',
               'sLoadingRecords': 'Cargando...',
               'oPaginate': {
                   'sFirst': 'Primero',
                   'sLast': 'Último',
                   'sNext': 'Siguiente',
                   'sPrevious': 'Anterior'
               },
               'oAria': {
                   'sSortAscending': ': Activar para ordenar la columna de manera ascendente',
                   'sSortDescending': ': Activar para ordenar la columna de manera descendente'
               }
           },
           'columns': [{
               'data': 'nombre'
           }, {
               'data': 'numcolegiado'
           }, {
               'data': 'nombreClinica',
                'render': function(data) {
                   return '<li>' + data + '</li><br>';
               }
           }, {
               'data': 'idClinica',
                "visible": false
           }, {
               'data': 'idDoctor',             
               'render': function(data) {
                   return '<a class="btn btn-primary editarbtn" href=http://localhost/php/modificar_clinica.php?id_doctor=' + data + '>Editar</a><a data-toggle="modal" data-target="#basicModal"  class="btn btn-warning borrarbtn" href=http://localhost/php/borrar_doctor.php?id_doctor=' + data + '>Borrar</a>';
               }
           }]
       });


       /*Creamos la función que muestre el formulario cuando hagamos click
       ojo, es necesario hacerlo con el método ON. 
       Tanto por rendimiento como porque puede haber elementos (botones) que todavía no existan en el document.ready*/

       //INICIO FUNCION editarbtn
       $('#miTabla').on('click', '.editarbtn', function(e) {
           e.preventDefault();

           $('#tabla').fadeOut(100);
           $('#formulario').fadeIn(100);

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#idDoctor').val(aData.idDoctor);
           $('#nombre').val(aData.nombre);
           $('#numcolegiado').val(aData.numcolegiado);
           $('#clinicas').val(aData.nombreClinica);
           cargarTarifas();
           
          var str = aData.idClinica;

          str = str.split(",");

          $('#clinicas').val(str);
          
           
       });
       //FIN FUNCION editarbtn



      //INICIO FUNCION borrarbtn
       $('#miTabla').on('click', '.borrarbtn', function(e) {
           //e.preventDefault();
                    var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           idDoctor = aData.idDoctor;

           alert(idDoctor);

       });
       //FIN FUNCION borrarbtn

       //INICIO FUNCION modal confborrar
       $('#basicModal').on('click','#confBorrar',function(e){
        alert(idDoctor);


           $.ajax({
               /*en principio el type para api restful sería delete pero no lo recogeríamos en $_REQUEST, así que queda como POST*/
               type: 'POST',
               dataType: 'json',
               url: 'php/borrar_doctor.php',
               //estos son los datos que queremos actualizar, en json:
               data: {
                   id_doctor: idDoctor
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                   alert("Ha entrado en error");
               // $('#edicionerr').html("Error al borrar doctor!").slideDown(2000).slideUp(2000);


                $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al borrar!"

                },{
                  type: "danger"
                });
               },
               success: function(data) {
                alert("borrado ok");
                   //obtenemos el mensaje del servidor, es un array!!!
                   //var mensaje = (data["mensaje"]) //o data[0], en función del tipo de array!!
                   //actualizamos datatables:
                   /*para volver a pedir vía ajax los datos de la tabla*/
                   var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
                 //  $('#edicionok').html("Borrado correcto!").slideDown(2000).slideUp(2000);
                $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Borrado realizado con exito!"

                },{
                  type: "success"
                });
               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax
               }
           });
        $('#tabla').fadeIn(100);
       });
      //FIN FUNCION modal confBorrar

      //INICIO FUNCION formulario editar(validar,growl etc)
           $('#formEditar').validate({
                        
                        rules: {
                             nombre: {
                                required: true,
                                lettersonly: true 
                               },
                        numcolegiado: {
                            required: true,
                                digits: true
                        },
                        clinicas:{
                          required:true
                        }
                        },
        submitHandler: function() {

          idDoctor = $('#idDoctor').val();
           nombre = $('#nombre').val();
           numcolegiado = $('#numcolegiado').val();
           id_clinica = $('#clinicas').val();




           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/modificar_clinica.php',
               //lo más cómodo sería mandar los datos mediante 
               //var data = $( "form" ).serialize();
               //pero como el php tiene otros nombres de variables, lo dejo así
               //estos son los datos que queremos actualizar, en json:
               data: {
                   idDoctor: idDoctor,
                   nombre: nombre,
                   numcolegiado: numcolegiado,
                   id_clinica:id_clinica
                   
               },
               error: function(xhr, status, error) {
                   //mostraríamos alguna ventana de alerta con el error
                    alert(error);
                    alert(xhr);

                    alert(status);

                   // $('#edicionerr').slideDown(2000).slideUp(2000);

                    $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al editar!"

                },{
                  type: "danger"
                });

               },
               success: function(data) {
                  var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
                 // alert("ok");
              //  $('#edicionok').slideDown(2000).slideUp(2000);

               
               
                 if(data[0].estado==0){

                 $.growl({
                  
                  icon: "glyphicon glyphicon-ok",
                  message: "Doctor editado correctamente!"

                },{
                  type: "success"
                });
               }else{

                 $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al editar el doctor!"

                },{
                  type: "danger"
                });
               }

               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax

               }
           });

           $('#tabla').fadeIn(100);
           $('#formulario').fadeOut(100);
            //$("#edicion").fadeOut(100);

        }
                       
   });
        //FIN FUNCION formulario editar

        //INICIO FUNCION formulario crear
           $('#formCrear').validate({
                        
                        rules: {
                             nombreNuevo: {
                                required: true,
                                lettersonly: true 
                               },
                        numcolegiadoNuevo: {
                            required: true,
                                digits: true
                        },
                        clinicas2:{
                          required:true
                        }
                        },
        submitHandler: function() {
          nombreNuevo = $('#nombreNuevo').val();
          numcolegiadoNuevo = $('#numcolegiadoNuevo').val();
          clinicas2 = $('#clinicas2').val();



           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/crear_doctor.php',
               data: {
                   nombreNuevo: nombreNuevo,
                   numcolegiadoNuevo: numcolegiadoNuevo,
                   clinicas2: clinicas2
                   
               },
               error: function(xhr, status, error) {
                  
                    $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al añadir el doctor!"

                },{
                  type: "danger"
                });

               },
               success: function(data) {
                  var $mitabla =  $("#miTabla").dataTable( { bRetrieve : true } );
                  $mitabla.fnDraw();
              
                if(data[0].estado==0){

                 $.growl({
                  
                  icon: "glyphicon glyphicon-ok",
                  message: "Doctor añadido correctamente!"

                },{
                  type: "success"
                });
               }else{

                 $.growl({
                  
                  icon: "glyphicon glyphicon-remove",
                  message: "Error al añadir el doctor!"

                },{
                  type: "danger"
                });
               }

               },
               complete: {
                   //si queremos hacer algo al terminar la petición ajax

               }
           });
          $('#formularioCrear').fadeOut(100);
          $('#tabla').fadeIn(100);
       
        }
                       
   });
  //FIN FORMULARIO crear



   //INICIO boton añadir doctor,oculto tabla para mostrar form
   $('#creaDoc').click(function(e) {
           e.preventDefault();

           //oculto tabla muestro form
          $('#tabla').fadeOut(100);
          $('#formularioCrear').fadeIn(100);
          cargarClinicaCrear();

       });
   //FIN boton añadir doctor,oculto tabla para mostrar form


    //INICIO cargarClinicaCrear
       function cargarClinicaCrear() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/listar_tarifas.php',
               async: false,
              
               error: function(xhr, status, error) {
                  
              
               },
               success: function(data) {
                   $('#clinicas2').empty();
                   $.each(data, function() {
                       $('#clinicas2').append(
                           $('<option ></option>').val(this.id_clinica).html(this.nombre)
                       );
                   });

               },
               complete: {
                 
               }
           });
       }
       //FIN cargarClinicaCrear



       //INICIO cargarTarifas
       function cargarTarifas() {
           $.ajax({
               type: 'POST',
               dataType: 'json',
               url: 'php/listar_tarifas.php',
               async: false,
             
               error: function(xhr, status, error) {
                  
              
               },
               success: function(data) {
                   $('#clinicas').empty();
                   $.each(data, function() {
                       $('#clinicas').append(
                           $('<option ></option>').val(this.id_clinica).html(this.nombre)
                       );
                   });

               },
               complete: {
                
               }
           });
       }
       //FIN cargarTarifas


   });
    
