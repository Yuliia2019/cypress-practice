/// <reference types="cypress" />

describe ('Registration', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('.hero-descriptor_btn.btn.btn-primary').click();
    })


    context ('Name validation', () => {
        it('Empty field', () => {
            cy.get('#signupName').focus(); 
            cy.get('#signupName').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Name is required'); 
        })

        it ('Wrong data', () => {
            cy.get('#signupName').type('Юлія'); 
            cy.get('#signupName').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Name is invalid'); 
        })

        it ('Wrong length', () => {
            cy.get('#signupName').type('A'); 
            cy.get('#signupName').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Name has to be from 2 to 20 characters long');
        })

        it ('Border color red', () => {
            cy.get('#signupName').focus();
            cy.get('#signupName').blur(); 
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context('Name boundary values (2 / 20 / 21)', () => {
        it ('Name length = 2 should be valid', () => {
            cy.get('#signupName').type('Ab').blur();
            cy.get('#signupName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it ('Name length = 20 should be valid', () => {
            const twenty = 'A'.repeat(20);
            cy.get('#signupName').type(twenty).blur();
            cy.get('#signupName').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it('Name length = 21 should be invalid', () => {
            const twentyOne = 'A'.repeat(21);
            cy.get('#signupName').type(twentyOne).blur();
            cy.get('.invalid-feedback').should('be.visible') .and('have.text', 'Name has to be from 2 to 20 characters long');
            cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Last name validation', () => {
         it('Empty field', () => {
            cy.get('#signupLastName').focus(); 
            cy.get('#signupLastName').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Last name is required'); 
        })
        it ('Wrong data', () => {
            cy.get('#signupLastName').type('Юлія'); 
            cy.get('#signupLastName').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Last name is invalid'); 
        })
        it ('Wrong length', () => {
            cy.get('#signupLastName').type('A'); 
            cy.get('#signupLastName').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Last name has to be from 2 to 20 characters long');
        })
         it ('Border color red', () => {
            cy.get('#signupLastName').focus();
            cy.get('#signupLastName').blur(); 
            cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Email validation', () => {
         it ('Wrong data', () => {
            cy.get('#signupEmail').type('u.test2026'); 
            cy.get('#signupEmail').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Email is incorrect'); 
        })
        it ('Empty field', () => {
            cy.get('#signupEmail').focus(); 
            cy.get('#signupEmail').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Email required'); 
        })
    
        it ('Border color red', () => {
            cy.get('#signupEmail').focus();
            cy.get('#signupEmail').blur(); 
            cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Password validation', () => {
        it ('Wrong data', () => {
            cy.get('#signupPassword').type('1234567'); 
            cy.get('#signupPassword').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'); 
        })
        it ('Empty field', () => {
            cy.get('#signupPassword').focus(); 
            cy.get('#signupPassword').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Password required'); 
        })
        it ('Border color red', () => {
            cy.get('#signupPassword').focus();
            cy.get('#signupPassword').blur(); 
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context('Password boundary values (8 / 15 / 16)', () => {
        it ('Password length = 8 should be valid (meets complexity)', () => {
            const pass8 = 'Aa123456';
            cy.get('#signupPassword').type(pass8).blur();
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })

        it ('Password length = 15 should be valid (meets complexity)', () => {
            const pass15 = 'Aa1234567890123'; 
            cy.get('#signupPassword').type(pass15).blur();
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        })
        it ('Password length = 16 should be invalid', () => {
            const pass16 = 'Aa12345678901234'; 
            cy.get('#signupPassword').type(pass16).blur();
            cy.get('.invalid-feedback').should('be.visible').and('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Re-enter password validation', () => {
        it ('Passwords do not match', () => {
            cy.get('#signupPassword').type('Test12345');
            cy.get('#signupRepeatPassword').type('Test123456');
            cy.get('#signupRepeatPassword').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Passwords do not match'); 
        })

        it ('Empty field', () => {
            cy.get('#signupRepeatPassword').focus(); 
            cy.get('#signupRepeatPassword').blur(); 
            cy.get('.invalid-feedback').should('have.text', 'Re-enter password required'); 
        })
        it ('Border color red', () => {
            cy.get('#signupRepeatPassword').focus();
            cy.get('#signupRepeatPassword').blur(); 
            cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        })
    })
    context ('Button register validation', () => {
        it ('Disabled button', () => {
            cy.get('#signupName').type('Test');
            cy.get('#signupLastName').type('Test');
            cy.get('#signupEmail').type('test@example.com');
            cy.get('#signupPassword').type('Test12345');
            cy.get('#signupRepeatPassword').type('Test123456');
            cy.get('.btn.btn-primary').should('be.disabled');
        })
        it ('Enabled button', () => {
            cy.get('#signupName').type('Test');
            cy.get('#signupLastName').type('Test');
            cy.get('#signupEmail').type('test@example.com');
            cy.get('#signupPassword').type('Test12345');
            cy.get('#signupRepeatPassword').type('Test12345');
            cy.get('.btn.btn-primary').should('be.enabled');
        })
    })
    context ('Successful registration', () => {
        it ('Successful registration', () => {
            cy.get('#signupName').type('Test');
            cy.get('#signupLastName').type('Test');
            cy.get('#signupEmail').type(`test+${Date.now()}@example.com`);
            cy.get('#signupPassword').type('Test12345');
            cy.get('#signupRepeatPassword').type('Test12345');
            cy.get('.btn.btn-primary').should('be.enabled');
            cy.get('.modal-content button.btn.btn-primary').click();
            cy.url().should('include', '/garage');
        })

    })
    context ('Registration with already registered email', () => {
        it ('Registration with already registered email', () => {
            cy.get('#signupName').type('Test');
            cy.get('#signupLastName').type('Test');
            cy.get('#signupEmail').type('test+3@example.com');
            cy.get('#signupPassword').type('Test12345');
            cy.get('#signupRepeatPassword').type('Test12345');
            cy.get('.btn.btn-primary').should('be.enabled');
            cy.get('.modal-content button.btn.btn-primary').click();
            cy.get('.alert.alert-danger').should('have.text', 'User already exists');
        })
    })
    context ('X close modal', () => {
        it ('Close modal', () => {
            cy.get('.modal-content button.close').click();
            cy.get('.modal-content').should('not.exist');
        })
    })

})