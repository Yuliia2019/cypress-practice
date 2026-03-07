class AddCarForm {
  get brandField() {
    return cy.get("#addCarBrand");
  }

  get modelField() {
    return cy.get("#addCarModel");
  }

  get mileageField() {
    return cy.get("#addCarMileage");
  }

  get addButton() {
    return cy.get("ngb-modal-window").contains("button", /^Add$/);
  }

  getAddCarButton() {
    return cy.contains("button", "Add car");
  }
  getAddSaveButton() {
    return cy.contains("button", "Save");
  }

  get wrongDataErrorMessage() {
    return cy.get("div.invalid-feedback");
  }
  get modal() {
    return cy.get("ngb-modal-window");
  }
  modalShouldBeVisible() {
    this.modal.should("be.visible");
  }
  modalShouldNotExist() {
    this.modal.should("not.exist");
  }
  carShouldBeVisible(name) {
    cy.contains(".car_name.h2", name).should("be.visible");
  }
  updateMileageForFirstCar(mileage) {
    cy.get(".update-mileage-form_input").first().clear().type(mileage);
    cy.get(".update-mileage-form_submit").first().should("be.visible").click();
  }
  clickEditFirstCar() {
    cy.get(".icon.icon-edit").first().click();
  }
  removeCar() {
    cy.contains("button", "Remove car").click({ force: true });
    cy.contains("button.btn-danger", "Remove").click({ force: true });
  }
  selectBrand(brand) {
    this.brandField.select(brand);
  }

  selectModel(model) {
    this.modelField.select(model);
  }

  enterMileage(mileage) {
    this.mileageField.type(mileage);
  }

  clickAdd() {
    this.addButton.click();
  }

  clickAddCarButton() {
    this.getAddCarButton().click();
  }
  clickSaveButton() {
    this.getAddSaveButton().click();
  }

  triggerErrorOnField(field) {
    field.focus();
    field.blur();
  }
}
export default new AddCarForm();
