/// <reference types="cypress" />

import SignUp from "../pom/forms/SignUp";
import HomePage from "../pom/pages/HomePage";
import users from "../fixtures/users.json";
import GaragePage from "../pom/pages/GaragePage";
import "../support/commands";
import CrudCar from "../pom/forms/CrudCar";
import FuelExpensesPage from "../pom/forms/FuelExpensesPage";

// describe('Garage', () => {
//   const email = `test+${Date.now()}@example.com`;
//   const password = users.correctUser.password;

//     beforeEach(() => {
//     cy.session(email, () => {
//       HomePage.visit();
//       HomePage.openSignUpForm();
//       SignUp.loginwithCredentials(email, password, password, 'Test', 'Test');
//       SignUp.registerButton.should('be.enabled');
//       SignUp.clickRegister();
//       GaragePage.pageTitle.should('have.text', 'Garage');
//     });

//     HomePage.visitGarage();
//     GaragePage.pageTitle.should('have.text', 'Garage') ;
//     cy.deleteAllCarsUI()
//     CrudCar.clickAddCarButton();
// });
//     context ('Mileage validation', () => {
//         it ('Mileage empty field', () => {
//             CrudCar.triggerErrorOnField(CrudCar.mileageField);
//             CrudCar.wrongDataErrorMessage.should('have.text', 'Mileage cost required');
//         })
//          it ('Mileage negative value', () => {
//             CrudCar.enterMileage('-100');
//             CrudCar.triggerErrorOnField(CrudCar.mileageField);
//             CrudCar.wrongDataErrorMessage.should('have.text', 'Mileage has to be from 0 to 999999');
//         })
//         it ('Mileage value more than 999999', () => {
//             CrudCar.enterMileage('1000000');
//             CrudCar.triggerErrorOnField(CrudCar.mileageField);
//             CrudCar.wrongDataErrorMessage.should('have.text', 'Mileage has to be from 0 to 999999');
//         })
//         it ('Mileage value 0 should be valid', () => {
//             CrudCar.enterMileage('0');
//             CrudCar.triggerErrorOnField(CrudCar.mileageField);
//         })
//     context ('Add a car', () => {
//         it ('Audi car', () => {
//             CrudCar.selectBrand('Audi');
//             CrudCar.selectModel('TT');
//             CrudCar.enterMileage('50000');
//             CrudCar.modalShouldBeVisible();
//             CrudCar.clickAdd();
//             CrudCar.carShouldBeVisible('Audi TT');

//         })
//           it ('BMW car', () => {
//             CrudCar.selectBrand('BMW');
//             CrudCar.selectModel('X5');
//             CrudCar.enterMileage('10000');
//             CrudCar.modalShouldBeVisible();
//             CrudCar.clickAdd();
//             CrudCar.carShouldBeVisible('BMW X5');

//         })
//         it ('Ford car', () => {
//             CrudCar.selectBrand('Ford');
//             CrudCar.selectModel('Sierra');
//             CrudCar.enterMileage('0');
//             CrudCar.modalShouldBeVisible();
//             CrudCar.clickAdd();
//             CrudCar.carShouldBeVisible('Ford Sierra');

//         })
//         it ('Porsche car', () => {
//             CrudCar.selectBrand('Porsche');
//             CrudCar.selectModel('911');
//             CrudCar.enterMileage('999999');
//             CrudCar.modalShouldBeVisible();
//             CrudCar.clickAdd();
//             CrudCar.carShouldBeVisible('Porsche 911');

//         })
//         it ('Fiat car', () => {
//             CrudCar.selectBrand('Fiat');
//             CrudCar.selectModel('Panda');
//             CrudCar.enterMileage('10');
//             CrudCar.modalShouldBeVisible();
//             CrudCar.clickAdd();
//             CrudCar.carShouldBeVisible('Fiat Panda');

//         })
//     context ('Edit a mileage', () => {
//         it ('Edit a mileage for first car', () => {
//             CrudCar.modalShouldNotExist();
//             CrudCar.updateMileageForFirstCar('20000');
//   });

//     context ('Edit a car', () => {
//         it ('Edit the first car', () => {
//             CrudCar.modalShouldNotExist();
//             CrudCar.clickEditFirstCar();
//             CrudCar.modalShouldBeVisible();
//             CrudCar.selectBrand('Fiat');
//             CrudCar.selectModel('Panda');
//             CrudCar.enterMileage('999999');
//             CrudCar.clickSaveButton();
//             CrudCar.modalShouldNotExist();
//             CrudCar.carShouldBeVisible('Fiat Panda');
//         })
//     context ('Delete a car', () => {
//         it ('Delete the first car', () => {
//             CrudCar.modalShouldNotExist();
//             CrudCar.clickEditFirstCar();
//             CrudCar.modalShouldBeVisible();
//             CrudCar.removeCar();
//             CrudCar.modalShouldNotExist();
//     })
// })
//     })
// })
// })
//     })
// })

describe("Garage", () => {
  const email = `test+${Date.now()}@example.com`;
  const password = users.correctUser.password;

  beforeEach(() => {
    cy.session(email, () => {
      HomePage.visit();
      HomePage.openSignUpForm();
      SignUp.loginwithCredentials(email, password, password, "Test", "Test");
      SignUp.clickRegister();
      GaragePage.pageTitle.should("have.text", "Garage");
    });

    HomePage.visitGarage();
    GaragePage.pageTitle.should("have.text", "Garage");
    cy.deleteAllCarsUI();
  });

  context("Mileage validation", () => {
    beforeEach(() => {
      CrudCar.clickAddCarButton();
      CrudCar.modalShouldBeVisible();
    });

    it("Mileage empty field", () => {
      CrudCar.triggerErrorOnField(CrudCar.mileageField);
      CrudCar.wrongDataErrorMessage.should(
        "have.text",
        "Mileage cost required",
      );
    });

    it("Mileage negative value", () => {
      CrudCar.enterMileage("-100");
      CrudCar.triggerErrorOnField(CrudCar.mileageField);
      CrudCar.wrongDataErrorMessage.should(
        "have.text",
        "Mileage has to be from 0 to 999999",
      );
    });

    it("Mileage value more than 999999", () => {
      CrudCar.enterMileage("1000000");
      CrudCar.triggerErrorOnField(CrudCar.mileageField);
      CrudCar.wrongDataErrorMessage.should(
        "have.text",
        "Mileage has to be from 0 to 999999",
      );
    });

    it("Mileage value 0 should be valid", () => {
      CrudCar.enterMileage("0");
      CrudCar.triggerErrorOnField(CrudCar.mileageField);
      CrudCar.wrongDataErrorMessage.should("not.exist"); // или .should('not.be.visible') если элемент остаётся
    });
  });

context("CRUD car", () => {
    beforeEach(() => {
      CrudCar.clickAddCarButton();
      CrudCar.modalShouldBeVisible();
      CrudCar.selectBrand("Audi");
      CrudCar.selectModel("TT");
      CrudCar.enterMileage("1000");
      CrudCar.clickAdd();
      CrudCar.modalShouldNotExist();
    });

context("Edit a mileage", () => {
    it("Edit a mileage for first car", () => {
        CrudCar.modalShouldNotExist();
        CrudCar.updateMileageForFirstCar("20000");
      });
    });
context("Edit a car", () => {
    it("Edit the first car", () => {
        CrudCar.clickEditFirstCar();
        CrudCar.modalShouldBeVisible();
        CrudCar.selectBrand("Fiat");
        CrudCar.selectModel("Panda");
        cy.get("#addCarMileage").clear().type("999999");
        CrudCar.clickSaveButton();
        CrudCar.modalShouldNotExist()        
        CrudCar.carShouldBeVisible("Fiat Panda");
      });
    });

context("Delete a car", () => {
    it("Delete the first car", () => {
        cy.get(".car_name.h2").first().invoke("text").then((rawName) => {
            const name = rawName.trim();

            CrudCar.clickEditFirstCar();
            CrudCar.modalShouldBeVisible();
            CrudCar.removeCar();
            cy.get("ngb-modal-window", { timeout: 15000 }).should("not.exist");
          });
      });
    });
  });
});
