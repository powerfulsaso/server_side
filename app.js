//load data
const employees = require('./data/employees.json');


const express = require('express');
const { body, validationResult } = require('express-validator');


const app = express();

/** Middlewares */
app.use(express.json());


/** Routes */
app.get('/api/employees', (request, response) => {
    let queryParams = request.query;
    let page = queryParams.page;
    let badges = queryParams.badges ? queryParams.badges : "";
    let userBool = false;
    if (queryParams.user) {
        userBool = queryParams.user.toLowerCase() === 'true';
    }

    if (page && page > 0) {
        console.log(`page= ${page}`);

        if (page == 1) {
            /**
             * 2. GET http://localhost:8000/api/employees?page=1
             * Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado
             */
            response
                .send(
                    employees.slice(0, 2)
                );
        }

        if (page == 2) {
            /**
             * 2. GET http://localhost:8000/api/employees?page=2
             * Devolverá del elemento 2 al elemento 3 del listado
             */
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
            let startIndex = (2 * (page - 1));
            let endIndex = (2 * (page - 1)) + 1;
            response.send(employees.slice(startIndex, endIndex));
        }
    } else

        if (userBool === true) {
            /**
             * 5. GET http://localhost:8000/api/employees?user=true
             * Devolverá listado de employees con privileges == "user"
             */
            response.send(
                employees.filter((x) => x.privileges == 'user')
            );
        } else if (badges != "") {
            let result = employees.filter((x) => x.badges.find((y) => y.toLowerCase() === badges.toLowerCase()));
            response.send(result);
        }
        else {
            /**
             1. GET http://localhost:8000/api/employees
             Devolverá un array JSON con el contenido del fichero "employees.json" que se adjunta al enunciado.
             Es posible añadirlo al código fuente con require('/path/to/employees.json') y guardarlo en una constante.
             */
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

app.post('/api/employees',
    [
        body('name').notEmpty().isString(),
        body('age').notEmpty().isNumeric(),
        body('phone.personal').notEmpty().isString(),
        body('phone.work').notEmpty().isString(),
        body('phone.ext').notEmpty().isNumeric(),
        body('privileges').notEmpty().isString(),
        body('favorites.artist').notEmpty().isString(),
        body('favorites.food').notEmpty().isString(),
        body('finished').isArray(),
        body('badges').isArray(),
        body('points').isArray()
    ], (request, response) => {
        /**
         * 6. POST http://localhost:8000/api/employees
        
        Añadirá un elemento al listado en memoria del programa (se perderá cada vez que se reinicie).
        Se validará que el body de la petición cumpla el mismo formato JSON que el resto de empleados.
        Si no cumpliera dicha validación, se devolverá status 400 con el siguiente contenido:
        
        {"code": "bad_request"}
        
         */
        // Verify if there are validation errors
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            console.log('validator error:', errors);
            return response.status(400).json({ "code": "bad_request" });
        }

        try {
            let newElement = request.body;
            employees.push(newElement);

            return response.status(204).json({ "code": "created" });
        } catch (error) {
            console.log(`error parsing: ${error}`);
        }

    });

app.get('/api/employees/:name', (request, response) => {
    /**
     * 8. GET http://localhost:8000/api/employees/NAME
     * Devolverá objeto employee cuyo nombre sea igual a NAME. NAME puede tomar diferentes valores:
     * Sue, Bob, etc.
     * Si no se encuentra el usuario con name == NAME se devolvera 
     * status 404 con el siguiente contenido:
     * {"code": "not_found"}  */

    let name = request.params.name;
    let result = employees.find((x) => x.name.toLowerCase() === name.toLowerCase());
    if (result) {
        response.status(200).json(result);
    } else {
        response.status(404).json({ "code": "not_found" });
    }
});


//start server
app.listen(8000, () => {
    console.log('server listening on port 8000!');
});

module.exports = app;