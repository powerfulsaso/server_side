const request = require('supertest');
const app = require('../app.js');
const res = require('express/lib/response.js');

describe('GET /api/employees', () => {
    test('should return all employees when no query parameters are provided', async () => {
        const response = await request(app).get('/api/employees');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0]).toHaveProperty('name');
        //expect(response.body).toEqual(/* Expected response body for this case */);
    });

    test('should return the first 2 employees when page=1 is provided', async () => {
        const response = await request(app).get('/api/employees?page=1');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toEqual("Sue");
        //expect(response.body).toEqual(/* Expected response body for this case */);
    });

    test('should return employees 2 and 3 when page=2 is provided', async () => {
        const response = await request(app).get('/api/employees?page=2');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toEqual("Willy");
        //expect(response.body).toEqual(/* Expected response body for this case */);
    });

    test('should return employees based on page number when page>2 is provided', async () => {
        const response = await request(app).get('/api/employees?page=3');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        //expect(response.body).toEqual(/* Expected response body for this case */);
    });

    test('should return employees with privileges="user" when user=true is provided', async () => {
        const response = await request(app).get('/api/employees?user=true');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].privileges).toEqual("user");
        //expect(response.body).toEqual(/* Expected response body for this case */);
    });

    test('should return employees with specified badges when badges query parameter is provided', async () => {
        const response = await request(app).get('/api/employees?badges=black');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body[0].badges).toContain("black");
        //expect(response.body).toEqual(/* Expected response body for this case */);
    });

    test('should return the oldest employee', async () => {
        const response = await request(app).get('/api/employees/oldest');
        expect(response.status).toBe(200);
        expect(response.body.age).toEqual(43);
    });

    test('should create a new employee, validate json structure, in case of error return {"code":"bad_request"}', async () => {
        //structure incomplete
        const newEmployee = {
            "name": "isaac",
            "age": 20,
        }

        const response = await request(app).post('/api/employees')
            .send(newEmployee);

        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ code: "bad_request" });
    });

    test('should return the employee with NAME= Sue', async () => {
        const response = await request(app).get('/api/employees/Sue');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(false);
        expect(response.body.name).toEqual("Sue");
    });

});
