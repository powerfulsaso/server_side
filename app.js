/*
1. GET http://localhost:8000/api/employees
Devolverá un array JSON con el contenido del fichero "employees.json" que se adjunta al enunciado.
Es posible añadirlo al código fuente con require('/path/to/employees.json') y guardarlo en una constante.
*/

//load data
const employees = require('./data/employees.json');

//create an express application
const express = require('express');
const app = express();

//define routes
app.get('/api/employees', (request, response) => {
    console.log(request);
    response.send(employees);
});

//start server
app.listen(8000, () => {
    console.log('server listening on port 8000!');
});