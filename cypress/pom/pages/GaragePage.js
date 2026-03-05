class GaragePage {
    get pageTitle() {
        return cy.contains('h1', 'Garage');
    }
    get fuelExpensesTitle() {
        return cy.contains('h1', 'Fuel expenses');
}
}

export default new GaragePage();