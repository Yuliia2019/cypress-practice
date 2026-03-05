class FuelExpensesPage {
openAddExpense() {
    cy.contains('button', 'Add an expense').should('be.visible').and('not.be.disabled').click();
    cy.get('ngb-modal-window').should('be.visible');
  }

  get carSelect() { 
    return cy.get('#addExpenseCar'); }
  get mileageInput() { 
    return cy.get('#addExpenseMileage'); }
  get litersInput() { 
    return cy.get('#addExpenseLiters'); }
  get totalCostInput() 
  { return cy.get('#addExpenseTotalCost'); }
  get modal() 
  { return cy.get('ngb-modal-window'); }

  fillExpense({ car, mileage, liters, totalCost } = {}) {
  if (car) this.carSelect.select(car);

  if (mileage !== undefined) {
    this.mileageInput.clear();
    const m = String(mileage);
    if (m.length > 0) this.mileageInput.type(m);
  }

  if (liters !== undefined) {
    this.litersInput.clear();
    const l = String(liters);
    if (l.length > 0) this.litersInput.type(l);
  }

  if (totalCost !== undefined) {
    this.totalCostInput.clear();
    const c = String(totalCost);
    if (c.length > 0) this.totalCostInput.type(c);
  }
}
  submitAdd() {
    cy.contains('button', /^Add$/).should('be.enabled').click();
    cy.get('ngb-modal-window').should('not.exist');
  }

  submitSave() {
    cy.contains('button', 'Save').should('be.enabled').click();
    cy.get('ngb-modal-window').should('not.exist');
  }

  confirmRemove() {
    cy.contains('button', /^Remove$/).click();
  }

  addExpense(data) {
    this.openAddExpense();
    this.fillExpense(data);
    this.submitAdd();
  }
  rows() { 
    return cy.get('tbody tr'); }
  firstRow() { 
    return this.rows().first(); }

  firstRowShouldContain({ mileage, liters, cost }) {
    this.firstRow().should('contain.text', String(mileage)).and('contain.text', liters).and('contain.text', cost);
  }

  editFirstRow() {
    this.rows().should('have.length.at.least', 1);
    this.firstRow().find('.icon.icon-edit').click({ force: true });
    cy.get('ngb-modal-window').should('be.visible');
  }

  deleteFirstRow() {
    this.rows().should('have.length.at.least', 1);
    this.firstRow().find('.icon.icon-delete').click({ force: true });
  }

  tableShouldBeEmpty() {
    cy.get('tbody tr').should('not.exist');
  }

  touchLiters() { this.litersInput.click().blur(); }
  touchMileage() { this.mileageInput.click().blur(); }
  touchTotalCost() { this.totalCostInput.click().blur(); }

  addButtonShouldBeDisabled() {
    cy.contains('button', /^Add$/).should('be.disabled');
  }

  errorShouldBe(text) {
    cy.contains('.invalid-feedback', text).should('be.visible');
  }
}

export default new FuelExpensesPage();