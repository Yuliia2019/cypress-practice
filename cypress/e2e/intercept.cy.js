/// <reference types="cypress" />

import SignUp from "../pom/forms/SignUp";
import HomePage from "../pom/pages/HomePage";
import users from '../fixtures/users.json';
import GaragePage from "../pom/pages/GaragePage";

describe("Registration + Intercept Profile", () => {
  let email;
  const password = users.correctUser.password;

  beforeEach(() => {
    HomePage.visit();
  });

  context("Successful registration", () => {
    it("Successful registration", () => {
      email = `test+${Date.now()}@example.com`;
      HomePage.openSignUpForm();
      SignUp.loginwithCredentials(
        email, password, password, "Test", "Test");
      SignUp.registerButton.should("be.enabled");
      SignUp.clickRegister();
      GaragePage.pageTitle.should("have.text", "Garage");
    });
  });

  context("Intercepting profile request", () => {
    it("Change user name", () => {
      email = `test+${Date.now()}@example.com`;
      HomePage.openSignUpForm();
      SignUp.loginwithCredentials(
        email, password, password, "Test", "Test");
      SignUp.registerButton.should("be.enabled");
      SignUp.clickRegister();
      GaragePage.pageTitle.should("have.text", "Garage");
      cy.intercept("GET", "**/api/users/profile", (req) => {
        req.reply((res) => {
          res.body.data.name = "Polar";
          res.body.data.lastName = "Bear";
        });
      }).as("profile");
      cy.visit("/panel/profile");
      cy.wait("@profile");
      cy.contains("Polar Bear").should("be.visible");
    });
  });
});