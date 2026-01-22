import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { HtmlMockPage } from '../../pages/HtmlMockPage';


// SCENARIO 1

Given('la page est en mode mock avec des résultats de chiens', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.setupMockWithDogResults();
});

When('l\'utilisateur navigue vers la page de recherche', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.goTo();
});

Then('une liste de chiens doit s\'afficher', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.expectPageLoaded('dogs');
});


// SCENARIO 2

Given('la page est en mode mock sans résultat', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.setupMockWithEmptyResults();
});

Then('aucune annonce ne doit s\'afficher', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.expectPageLoaded('empty');
});


// SCENARIO 3

Given('la page est en mode mock avec erreur API', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.setupMockWithError();
});

Then('un message d\'erreur doit s\'afficher', async function (this: CustomWorld) {
  const mockPage = new HtmlMockPage(this.page);
  await mockPage.expectPageLoaded('error');
});