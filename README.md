# practica-ajax-datatables

En la carpeta base_de_datos se proporciona la documentación original de la aplicación que se simula así como ficheros para realizar creación y la inserción de los datos necesarios en la base de datos. Corresponden a ejercicios que se han hecho previamente en clase.

Se proporciona un video demo.webm donde se muestra el comportamiento aproximado que debe tener la aplicación. 

Los requerimientos que debe cumplir la aplicación son los siguientes:

1. Funcionalidad y apariencia de Datatables
   - Configura el plugin datatables con tu estilo preferido (bootstrap, themeroller o uno propio).
   - Configura datatables con paginación y filtro que deben funcionar correctamente. 
   - Configura datatables con mensajes en español. 
   - Configura datatables para que acceda a los datos de la base de datos y muestre las mismas columnas que en el vídeo demo.webm. 
   - Para "personalizar" la vista que necesita datatables, se pueden utilizar las funciones de mysql concat y group_concat

2. Borrar doctores
   - Se deben poder borrar doctores vía ajax (no es necesario capturar error) actualizando la tabla de datos a la vez que se borra en la bbdd.
   - Antes de borrar el doctor nos debe mostrar una advertencia permitiendo cancelar la operación
   - Se debe mostrar una ventana tipo growl con el éxito o fracaso al borrar el doctor

3. Añadir doctores
   - Mediante ajax
   - Debe mostrar una ventana tipo growl con el éxito o fracaso de la operación
   - Al añadir doctores es necesario realizar **validación**: 
     - Asignación de al menos una clínica. Pueden ser más
     - Nombre de doctor requerido (solo letras)
     - Número de colegiado sea numérico, no requerido.

4. Modificar doctores
   - Mediante ajax, se deben poder modificar doctores (nombre, número colegiado, clínica/s asociada) actualizando la tabla de datos a la vez que se inserta en la bbdd.
   - Debe mostrar una ventana tipo growl con el éxito o fracaso de la operación
    - Al modificar doctores es necesario realizar **validación**: 
       - Asignación de al menos una clínica
       - Nombre de doctor requerido (solo letras)
       - Número de colegiado sea numérico, no requerido.

5. Para la entrega de la práctica se debe dejar una **versión de producción** (minified, minimizando el número de http requests.. en el servidor infenlaces.com, de modo que sea accesible navegando desde la url anterior). Debe haber una versión de desarrollo colgada en github a partir de un **fork de la que aquí presento**. Deberá tener un **mínimo de 5 commits en 3 días diferentes**. **Se recomienda el uso de Yeoman para la realización de la práctica.**
