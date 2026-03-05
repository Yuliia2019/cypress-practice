/// <reference types="cypress" />

import SignUp from "../pom/forms/SignUp";
import HomePage from "../pom/pages/HomePage";
import users from '../fixtures/users.json';
import GaragePage from "../pom/pages/GaragePage";

describe ('Registration', () => {
    beforeEach(() => {
        HomePage.visit();
        HomePage.openSignUpForm();
    })


    context ('Name validation', () => {
        it ('Empty field', () => {
            SignUp.triggerErrorOnField(SignUp.nameField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Name is required'); 
        })

        it ('Wrong data', () => { 
            SignUp.enterName('Юлія');
            SignUp.triggerErrorOnField(SignUp.nameField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Name is invalid'); 
        })

        it ('Wrong length', () => {
            SignUp.enterName('A');
            SignUp.triggerErrorOnField(SignUp.nameField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Name has to be from 2 to 20 characters long');
        })

        it ('Border color red', () => {
            SignUp.triggerErrorOnField(SignUp.nameField);
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context('Name boundary values (2 / 20 / 21)', () => {
        it ('Name length = 2 should be valid', () => {
            SignUp.enterName('Ab');
            SignUp.triggerErrorOnField(SignUp.nameField);
            cy.get('#signupName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it ('Name length = 20 should be valid', () => {
            const twenty = 'A'.repeat(20);
            SignUp.enterName(twenty);
            SignUp.triggerErrorOnField(SignUp.nameField);    
            cy.get('#signupName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it ('Name length = 21 should be invalid', () => {
            const twentyOne = 'A'.repeat(21);
            SignUp.enterName(twentyOne);
            SignUp.triggerErrorOnField(SignUp.nameField);
            SignUp.wrongDataErrorMessage.should('be.visible').and('have.text', 'Name has to be from 2 to 20 characters long');
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Last name validation', () => {
        it('Empty field', () => {
            SignUp.triggerErrorOnField(SignUp.lastNameField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Last name is required'); 
        })
        it ('Wrong data', () => {
            SignUp.enterLastName('Юлія');
            SignUp.triggerErrorOnField(SignUp.lastNameField); 
            SignUp.wrongDataErrorMessage.should('have.text', 'Last name is invalid'); 
        })
        it ('Wrong length', () => {
            SignUp.enterLastName('A'); 
            SignUp.triggerErrorOnField(SignUp.lastNameField); 
            SignUp.wrongDataErrorMessage.should('have.text', 'Last name has to be from 2 to 20 characters long');
        })
        it ('Border color red', () => {
            SignUp.triggerErrorOnField(SignUp.lastNameField);
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Email validation', () => {
        it ('Wrong data', () => {
            SignUp.enterEmail('u.test2026');
            SignUp.triggerErrorOnField(SignUp.emailField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Email is incorrect'); 
        })
        it ('Empty field', () => {
            SignUp.triggerErrorOnField(SignUp.emailField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Email required'); 
        })
    
        it ('Border color red', () => {
            SignUp.triggerErrorOnField(SignUp.emailField);
            cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Password validation', () => {
        it ('Wrong data', () => {
            SignUp.enterPassword('1234567');
            SignUp.triggerErrorOnField(SignUp.passwordField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'); 
        })
        it ('Empty field', () => {
            SignUp.triggerErrorOnField(SignUp.passwordField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Password required'); 
        })
        it ('Border color red', () => {
            SignUp.triggerErrorOnField(SignUp.passwordField);
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context('Password boundary values (8 / 15 / 16)', () => {
        it ('Password length = 8 should be valid (meets complexity)', () => {
            const pass8 = 'Aa123456';
            SignUp.enterPassword(pass8);
            SignUp.triggerErrorOnField(SignUp.passwordField);
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it ('Password length = 15 should be valid (meets complexity)', () => {
            const pass15 = 'Aa1234567890123'; 
            SignUp.enterPassword(pass15); 
            SignUp.triggerErrorOnField(SignUp.passwordField);
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })
        it ('Password length = 16 should be invalid', () => {
            const pass16 = 'Aa12345678901234'; 
            SignUp.enterPassword(pass16);
            SignUp.triggerErrorOnField(SignUp.passwordField);
            SignUp.wrongDataErrorMessage.should('be.visible').and('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Re-enter password validation', () => {
        it ('Passwords do not match', () => {
            SignUp.enterPassword('Test12345');
            SignUp.triggerErrorOnField(SignUp.passwordField);   
            SignUp.enterRepeatPassword('Test123456');
            SignUp.triggerErrorOnField(SignUp.repeatPasswordField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Passwords do not match'); 
        })

        it ('Empty field', () => {
            SignUp.triggerErrorOnField(SignUp.repeatPasswordField);
            SignUp.wrongDataErrorMessage.should('have.text', 'Re-enter password required'); 
        })
        it ('Border color red', () => {
            SignUp.triggerErrorOnField(SignUp.repeatPasswordField);
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Button register validation', () => {
        it ('Disabled button', () => {
            SignUp.loginwithCredentials(users.correctUser.email, users.correctUser.password, 'Test123456', 'Test', 'Test');
            SignUp.registerButton.should('be.disabled');

        })
        it ('Enabled button', () => {
            SignUp.loginwithCredentials(users.correctUser.email, users.correctUser.password, users.correctUser.password, 'Test', 'Test');
            SignUp.clickRegister;
            SignUp.registerButton.should('be.enabled');
            
    })
    context ('Successful registration', () => {
        it ('Successful registration', () => {
            SignUp.loginwithCredentials(`test+${Date.now()}@example.com`, users.correctUser.password, users.correctUser.password, 'Test', 'Test');   
            SignUp.registerButton.should('be.enabled');
            SignUp.clickRegister(); 
            GaragePage.pageTitle.should('have.text', 'Garage');
        })

    })
    context ('Registration with already registered email', () => {
        it ('Registration with already registered email', () => {
            SignUp.loginwithCredentials('test+3@example.com', users.correctUser.password, users.correctUser.password, 'Test', 'Test');  
            cy.get('.btn.btn-primary').should('be.enabled');
            SignUp.clickRegister();
            SignUp.errorWithAlreadyRegisteredEmail.should('have.text', 'User already exists');
        })
    })
    context ('X close modal', () => {
        it ('Close modal', () => {
            SignUp.clickCloseModal();
        })
    })

})
})
