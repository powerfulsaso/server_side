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

    if (page && page > 0) {
        console.log(`page= ${page}`);

        if (page == 1) {
            response
                .send(
                    employees.slice(0, 2)
                );
        }

        if (page == 2) {
            response
                .send(
                    employees.slice(2, 4)
                );
        }

        if (page > 2) {

            /**
             * 3. GET http://localhost:8000/api/employees?page=N
             * Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1.
             */
            startIndex = (2 * (page - 1));
            endIndex = (2 * (page - 1)) + 1;
            response.send(employees.slice(startIndex, endIndex));
        }
    } else {
        response.send(employees);
    }

});


app.get('/api/employees/oldest', (request, response) => {
    /**
     * 4. GET http://localhost:8000/api/employees/oldest
     * Devolverá el objeto individual correspondiente al empleado con más edad. En caso de existir más
     * de uno, se devolverá la primera ocurrencia
     */

    if (employees.length) {
        response
            .send(
                employees
                    .sort((a, b) => b.age - a.age)[0]

            );
    }
});

//start server
app.listen(8000, () => {
    console.log('server listening on port 8000!');
});