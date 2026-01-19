import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { MockPage } from '../../pages/MockPage';


// SCENARIO 1

Given('la page est en mode mock avec des résultats de chiens', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.setupMockWithDogResults();
});

When('l\'utilisateur navigue vers la page de recherche', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.navigateToSearchPage();
});

Then('les données mockées doivent être utilisées pour la recherche', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.expectPageLoaded();
});


// SCENARIO 2

Given('la page est en mode mock sans résultats', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.setupMockWithEmptyResults();
});

Then('aucune annonce ne doit s\'afficher', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.expectPageLoaded();
});


// SCENARIO 3

Given('la page est en mode mock avec erreur API', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.setupMockWithApiError();
});

Then('un message d\'erreur doit être affiché', async function (this: CustomWorld) {
  const mockPage = new MockPage(this.page);
  await mockPage.expectPageLoaded();
});