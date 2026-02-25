class HomePage { 
    get signInButton() {
        return cy.get('.hero-descriptor_btn.btn.btn-primary');
    }
    visit() {
        cy.visit('/');
    }   

    openSignUpForm() {
        this.signInButton.click();
    }
}

export default new HomePage();