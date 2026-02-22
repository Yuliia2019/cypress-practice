

describe('Search elements', () => {
  beforeEach(() => {
    cy.visit('/');
  }
  );
  it('cy.get', () => {
    cy.visit('/');
    cy.get('h1');
  })
  it('cy.contains', () => {
    cy.visit('/');
    cy.contains('button', 'About');
  })   
  it('find', () => {
    cy.get('a').find('span');
 })
  it('children', () => {
    cy.get('a').children('span');
  })
  it('parent', () => {
    cy.get('.icon-telegram').parent();
  })
  it('within', () => {
    cy.get('.header_signin').click();
    cy.get('.modal-content').within(() => {
      cy.get('.btn-primary');
    });  
  })

  context('Multiple elements', () => {
    it('first, last, eq', () => {
        cy.get('.socials_icon').first();
        cy.get('.socials_icon').last();
        cy.get('.socials_icon').eq(2);
    })   
  })
})