import { Page, expect } from '@playwright/test';


export class SearchPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://www.uncompagnon.fr/');
        await this.page.waitForTimeout(2000);
        try {
            const cookieButton = this.page.locator('button:visible').filter({ hasText: /accepter|accept|tout/i }).first();
            await cookieButton.click({ timeout: 3000, force: true });
            await this.page.waitForTimeout(1000);
        } catch {
            //console.log("Pas de cookie");
        }
        const selectAnimals = this.page.locator('#select-animals, .select-animals');
        await selectAnimals.waitFor({ state: 'visible', timeout: 5000 });
        await selectAnimals.scrollIntoViewIfNeeded();
    }

    async selectCategory(categoryLabel: string) {
        await this.page.locator('#select-animals, .select-animals').selectOption({ label: categoryLabel });
    }

    async enterBreed(breedName: string) {
        await this.page.locator('span#select2-select-races-container').click();
        const searchInput = this.page.locator('input.select2-search__field');
        await searchInput.waitFor({ state: 'visible' });
        await searchInput.pressSequentially(breedName, { delay: 100 });
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async enterLocation(locationName: string) {
        const locInput = this.page.locator('span.tagify__input');
        await locInput.click();
        await this.page.keyboard.type(locationName, { delay: 100 });
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown');
        await this.page.keyboard.press('Enter');
    }

    async toggleAdvancedOptions() {
        const link = this.page.locator('a.font12.text-secondary.me-3.pt-1');
        if (await link.isVisible()) {
            await link.click();
        }
    }

    async selectType(typeLabel: string) {
        await this.page.locator('select#select-type_announces').selectOption({ label: typeLabel });
    }

    async submitSearch() {
        await this.page.locator('.btn-submit-main-search, #btn-submit-main-search').click();
    }

    async expectResultsVisible() {
        await expect(this.page).toHaveURL(/.*annonces\/chiens/);
    }

    async expectPerduResults() {
        await expect(this.page).toHaveURL(/.*id_type_announce.*=1/);
    }

    async expectNoResults() {
        await expect(this.page.locator('body')).toContainText("Aucune annonce");
    }

    // NOUVELLE ASSERTION POUR LE LABRADOR
    async expectBreedInResults(breedText: string) {
        await expect(this.page.locator('body')).toContainText(breedText);
    }
}