// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('deleteAllCarsUI', () => {

  const tryDeleteOne = () => {
    cy.get('body').then(($body) => {

      const editBtns = $body.find('button').filter((_, el) => {
        const text = (el.innerText || '').trim().toLowerCase()
        return text === 'edit'
      })

      if (editBtns.length === 0) {
        cy.log('No cars left')
        return
      }

      cy.wrap(editBtns[0]).click({ force: true })

      cy.contains('button', /remove/i).click({ force: true })

      cy.get('body').then(($b) => {
        if ($b.find('ngb-modal-window').length) {
          cy.contains('button', /remove/i).click({ force: true })
        }
      })

      cy.wait(300)

      tryDeleteOne()
    })
  }

  tryDeleteOne()

})

Cypress.Commands.add("deleteAllCarsAPI", () => {
  cy.getCookie("sid").then((cookie) => {
    if (!cookie?.value) return;

    const sid = `sid=${cookie.value}`;

    cy.request({
      method: "GET",
      url: "/api/cars",
      headers: { Cookie: sid },
      failOnStatusCode: false,
    }).then((res) => {
      const cars = res.body?.data || [];

      if (!cars.length) return;

      cars.forEach((car) => {
        cy.request({
          method: "DELETE",
          url: `/api/cars/${car.id}`,
          headers: { Cookie: sid },
          failOnStatusCode: false,
        });
      });
    });
  });
});