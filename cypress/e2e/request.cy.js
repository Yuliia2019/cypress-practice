/// <reference types="cypress" />

import users from '../fixtures/users.json';

describe('Public API request', () => {
  it('GET brands 1', () => {
    cy.request('GET', '/api/cars/brands').then((response) => {
        const cars = response.body.data;
        expect(response.status).to.eq(200);
        expect(cars).to.have.length(5);
        expect(cars[0].title).to.eq('Audi');
    }); 
})
    it('GET brands 2', () => {
    cy.request('GET', '/api/cars/brands').then((response) => {
        const cars = response.body.data;
        expect(response.status).to.eq(200);
        cy.wrap(cars).should('have.length', 5);
        cy.wrap(cars[0].title).should('eq', 'Audi');
    }); 
})
    it('GET brands 3', () => {
    cy.request('GET', '/api/cars/brands').its('status').should('eq', 200);
    cy.request('GET', '/api/cars/brands').its('body.data').should('have.length', 5);
    cy.request('GET', '/api/cars/brands').its('body.data.0.title').should('eq', 'Audi'); 
})
})

describe('Private API request', () => {
    let carId;
    let sid;
    before(() => {
        cy.request('POST', '/api/auth/signin', {
            email: users.correctUser.email,
            password: users.correctUser.password,
        }).then((response) => {
            const headers = response.headers;
            sid = headers['set-cookie'][0].split(';')[0];
            cy.log('sid');
        })
    })
    it ('Add a car', () => {
        cy.log('sid');
        cy.request({
            url: '/api/cars',
            method: 'POST',
            body:{
            carBrandId: 1,
            carModelId: 2,
            mileage: 99999
            },
            headers: {
                Cookie: sid
            }, 
            failOnStatusCode: false,
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(201);
            carId = response.body.data.id;
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(2);
            expect(response.body.data.mileage).to.eq(99999);
})
    })
    it ('Get a car by ID', () => {
        cy.log('sid');
        cy.request({
            url: `/api/cars/${carId}`,
            method: 'GET',
            headers: {
                Cookie: sid
            },
            failOnStatusCode: false,
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(carId);
        });
    });   
    it ('Edit a car', () => {
        cy.log('sid');
        cy.request({
            url: `/api/cars/${carId}`,
            method: 'PUT',
            body:{
            carBrandId: 1,
            carModelId: 1,
            mileage: 168223
            },
            headers: {
                Cookie: sid
            }, 
            failOnStatusCode: false,
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
            expect(response.body.data.carBrandId).to.eq(1);
            expect(response.body.data.carModelId).to.eq(1);
            expect(response.body.data.mileage).to.eq(168223);
})
    })
    it ('Delete a car', () => {
        cy.log('sid');
        cy.request({
            url: `/api/cars/${carId}`,
            method: 'DELETE',
            headers: {
                Cookie: sid
            },
            failOnStatusCode: false,
        }).then((response) => {
            cy.log(JSON.stringify(response.body));
            expect(response.status).to.eq(200);
        })
    })
})
            

