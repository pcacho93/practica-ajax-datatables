'use strict';
   $(document).ready(function() {
       $('#miTabla').DataTable({
           'destroy': true,
           'processing': true,
           'serverSide': true,
           'ajax': 'php/cargar_doctores.php',
           "language": {
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
               'data': 'nombredoctor'
           }, {
               'data': 'numcolegiado'
           }, {
               'data': 'nombre'
           }, {
               'data': 'numcolegiado',
               'render': function(data) {
                   return '<a class="btn btn-primary" href=http://localhost/proyecto-datatables/php/editar_doctores.php?numcolegiado=' + data + '>Editar</a>';
               }
           }, {
               'data': 'numcolegiado',
               'render': function(data) {
                   return '<a class="btn btn-danger" href=http://localhost/proyecto-datatables/php/borrar_doctores.php?numcolegiado=' + data + '>Borrar</a>';
               }
           }]
       });

      //cargar ventana al pulsar editar
      $('#miTabla').on('click', '.editarbtn', function(e) {
           e.preventDefault();
           $('#tabla').fadeOut(100);
           $('#formulario').fadeIn(100);

           var nRow = $(this).parents('tr')[0];
           var aData = miTabla.row(nRow).data();
           $('#nombredoctor').val(aData.nombredoctor);
           $('#numcolegiado').val(aData.numcolegiado);
           //cargar las clínicas , seleccionado a las que pertenezca el doctor
           

           $('#clinicas').val(aData.nombre);
          
           

       });
   });