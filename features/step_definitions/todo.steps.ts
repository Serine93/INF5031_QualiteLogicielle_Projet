import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { SearchPage } from '../../pages/SearchPage';


Given('l’utilisateur est sur la page de recherche d’annonces', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.goTo();
});


// SCENARIO 1

When('l’utilisateur sélectionne la catégorie {string}', async function (this: CustomWorld, category: string) {
  const searchPage = new SearchPage(this.page);
  await searchPage.selectCategory(category);
});

When('il valide la recherche', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.submitSearch();
});

Then('toutes les annonces de la catégorie {string} s’affichent', async function (this: CustomWorld, category: string) {
  const searchPage = new SearchPage(this.page);
  await searchPage.expectResultsVisible();
});


// SCENARIO 2

When('l’utilisateur saisit un type de chien précis', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.selectCategory("Chiens");
});

When('l’utilisateur applique le filtre {string}', async function (this: CustomWorld, filterType: string) {
  const searchPage = new SearchPage(this.page);
  await searchPage.toggleAdvancedOptions();
  await searchPage.selectType(filterType);
  await searchPage.submitSearch();
});

Then('la liste des annonces s’actualise avec uniquement les annonces “Perdu” correspondant à ce type de chien', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.expectPerduResults();
});


// SCENARIO 3 

When('l’utilisateur saisit la race {string}', async function (this: CustomWorld, breed: string) {
  const searchPage = new SearchPage(this.page);
  await searchPage.selectCategory("Chiens");
  await searchPage.enterBreed(breed);
});

When('il ne sélectionne aucune localisation', async function (this: CustomWorld) {
  // Rien à faire
});

Then('des annonces correspondantes s’affichent', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.expectResultsVisible();
});


// SCENARIO 4 (Dobermann + Loc)

When('l’utilisateur sélectionne la localisation {string}', async function (this: CustomWorld, location: string) {
  const searchPage = new SearchPage(this.page);
  await searchPage.enterLocation(location);
});

Then('un message indique qu’aucun chien ne correspond aux critères dans cette zone', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.expectNoResults();
});


// SCENARIO 5 

When('l’utilisateur saisit une race existante sur la plateforme', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.selectCategory("Chiens");
  await searchPage.enterBreed("Labrador Retriever");
});

When('il ne sélectionne aucun autre filtre', async function (this: CustomWorld) {
  //console.log("Aucun autre filtre sélectionné.");
});

Then('les annonces correspondant à cette race s’affichent correctement avec un labrador retriever', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page);
  await searchPage.expectBreedInResults("Labrador Retriever");
});

