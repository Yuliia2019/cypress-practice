/// <reference types="cypress" />

import SignUp from "../pom/forms/SignUp";
import HomePage from "../pom/pages/HomePage";   
import users from '../fixtures/users.json';
import GaragePage from "../pom/pages/GaragePage";
import '../support/commands';
import CrudCar from "../pom/forms/CrudCar";
import FuelExpensesPage from "../pom/forms/FuelExpensesPage";


describe('Fuel expenses', () => {
  const email = `test+${Date.now()}@example.com`;
  const password = users.correctUser.password;

  beforeEach(() => {
    cy.session(email, () => {
      cy.visit('/panel/garage');
      HomePage.openSignUpForm();
      SignUp.loginwithCredentials(email, password, password, 'Test', 'Test');
      SignUp.registerButton.should('be.enabled');
      SignUp.clickRegister();
      GaragePage.pageTitle.should('have.text', 'Garage');
    });

    HomePage.visitGarage();
    GaragePage.pageTitle.should('have.text', 'Garage') ; 
    cy.deleteAllCarsUI()
    CrudCar.clickAddCarButton();
    CrudCar.modalShouldBeVisible();

    CrudCar.selectBrand('Audi');
    CrudCar.selectModel('Q7');
    CrudCar.enterMileage('1000');

    cy.contains('button', /^Add$/).click();
    CrudCar.modalShouldNotExist();

    HomePage.visitFuelExpenses();
    GaragePage.fuelExpensesTitle.should('have.text', 'Fuel expenses');
  });

context('Add an expense', () => {
    it('Add an expense', () => {
    FuelExpensesPage.addExpense({
        mileage: '50000',
        liters: '50',
        totalCost: '5'
      });
      FuelExpensesPage.firstRowShouldContain({
        mileage: '50000',
        liters: '50L',
        cost: '5.00 USD'
      });
    });
});
      

context('Edit an expense', () => {
  it('Edit an expense', () => {
    FuelExpensesPage.addExpense({
      mileage: '50000',
      liters: '50',
      totalCost: '5'
    });
    FuelExpensesPage.editFirstRow();
    FuelExpensesPage.fillExpense({
      mileage: '60000',
      liters: '60',
      totalCost: '6'
    });
    FuelExpensesPage.submitSave();
    FuelExpensesPage.firstRowShouldContain({
      mileage: '60000',
      liters: '60L',
      cost: '6.00 USD'
    });
  });
})

context('Delete an expense', () => {
  it('Delete an expense', () => {
    FuelExpensesPage.addExpense({
      mileage: '50000',
      liters: '50',
      totalCost: '5'
    });
    FuelExpensesPage.deleteFirstRow();
    FuelExpensesPage.confirmRemove();
    FuelExpensesPage.rows().should('have.length', 0);
  });
})
context('Validation Number of liters field', () => {
  it('Liters required', () => {
    FuelExpensesPage.openAddExpense();
    FuelExpensesPage.fillExpense({
      mileage: '50000',
      totalCost: '5'
    }); 
    FuelExpensesPage.touchLiters();
    FuelExpensesPage.addButtonShouldBeDisabled();
    FuelExpensesPage.errorShouldBe('Liters required');
});
});
context('Validation Total cost field', () => {
  it('Total cost required', () => {
    FuelExpensesPage.openAddExpense();
    FuelExpensesPage.fillExpense({
      mileage: '50000',
      liters: '50'
    });
    FuelExpensesPage.touchTotalCost();
    FuelExpensesPage.addButtonShouldBeDisabled();
    FuelExpensesPage.errorShouldBe('Total cost required');
    });
});

context('Validation Mileage field', () => {
  it('Mileage required', () => {
    FuelExpensesPage.openAddExpense();
    FuelExpensesPage.fillExpense({
      liters: '50',
      totalCost: '5', 
      mileage: ''
    });
    FuelExpensesPage.touchMileage();
    FuelExpensesPage.addButtonShouldBeDisabled();
    FuelExpensesPage.errorShouldBe('Mileage required');
  });
});
})