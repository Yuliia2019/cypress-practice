class SignUpForm {
    get emailField() {
        return cy.get('#signupEmail');
    }

    get passwordField() {
        return cy.get('#signupPassword');
    }

    get repeatPasswordField() {
        return cy.get('#signupRepeatPassword');
    }

    get nameField() {
        return cy.get('#signupName');
    }

    get lastNameField() {
        return cy.get('#signupLastName');
    }

    get registerButton() {
        return cy.get('.modal-content button.btn.btn-primary');
    }

    get wrongDataErrorMessage() {
        return cy.get('.invalid-feedback');
    }

    get errorWithAlreadyRegisteredEmail() {
        return cy.get('.alert.alert-danger');
    }
    get closeModalButton() {
        return cy.get('.modal-content button.close');
    }
    enterEmail(email) {
        this.emailField.type(email);
    }

    enterPassword(password) {
        this.passwordField.type(password);
    }

    enterRepeatPassword(repeatPassword) {
        this.repeatPasswordField.type(repeatPassword);
    }

    enterName(name) {
        this.nameField.type(name);
    }

    enterLastName(lastName) {
        this.lastNameField.type(lastName);
    }

    clickRegister() {
        this.registerButton.click();
    } 
    loginwithCredentials(email, password, repeatPassword, name, lastName) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.enterRepeatPassword(repeatPassword);
        this.enterName(name);
        this.enterLastName(lastName);
    }
    triggerErrorOnField(field) {
        field.focus();
        field.blur();
    }
    clickCloseModal() {
        this.closeModalButton.click();

}
}
export default new SignUpForm();