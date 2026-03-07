class HomePage { 
    get signInButton() {
        return cy.get('.hero-descriptor_btn.btn.btn-primary');
    }
    visit() {
        cy.visit('/');
    } 
    
    visitGarage() {
        cy.visit('/panel/garage');
    }

    visitFuelExpenses() {
        cy.visit('/panel/expenses');
    }

    openSignUpForm() {
        this.signInButton.click();
    }
}

export default new HomePage();