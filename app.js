/** 
 * 1. GET http://localhost:8000/api/employees
 * Devolverá un array JSON con el contenido del fichero "employees.json" que se adjunta al enunciado.
 * Es posible añadirlo al código fuente con require('/path/to/employees.json') y guardarlo en una constante.
*/


//load data
const employees = require('./data/employees.json');

//create an express application
const express = require('express');
const app = express();

//define routes
app.get('/api/employees', (request, response) => {
    queryParams = request.query;
    page = queryParams.page;
    if (page) {
        console.log(`page= ${page}`);
        if (page == 1) {
            /**
             * 2. GET http://localhost:8000/api/employees?page=1
             * Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado
             */

            response.send(employees.slice(0, 2));
        } else if (page == 2) {
            /**
             * 3. GET http://localhost:8000/api/employees?page=2
             * Devolverá del elemento 2 al elemento 3 del listado
             */

            response.send(employees.slice(1, 3));
        }

    } else {
        response.send(employees);
    }

});


//start server
app.listen(8000, () => {
    console.log('server listening on port 8000!');
});