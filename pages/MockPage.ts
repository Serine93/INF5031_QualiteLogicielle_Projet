import { Page } from '@playwright/test';


export class MockPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setupMockWithDogResults() {
        const mockData = {
            results: [
                {
                    id: 1,
                    name: 'Max',
                    breed: 'Labrador retriever',
                    category: 'Chiens',
                    type: 'Perdu',
                    location: 'Paris',
                    description: 'Chien perdu dans le 15ème arrondissement'
                },
                {
                    id: 2,
                    name: 'Luna',
                    breed: 'Golden Retriever',
                    category: 'Chiens',
                    type: 'Trouvé',
                    location: 'Lyon',
                    description: 'Chien trouvé près du parc'
                }
            ],
            total: 2
        };

        await this.page.route('**/api/search**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockData)
            });
        });
    }

    async setupMockWithEmptyResults() {
        const emptyData = {
            results: [],
            total: 0,
            message: 'Aucune annonce trouvée'
        };

        await this.page.route('**/api/search**', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(emptyData)
            });
        });
    }

    async setupMockWithApiError() {
        await this.page.route('**/api/**', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: 'Internal Server Error',
                    message: 'Une erreur est survenue lors de la recherche'
                })
            });
        });
    }

    async navigateToSearchPage() {
        await this.page.goto('https://www.uncompagnon.fr/');
        try {
            const cookieButton = this.page.locator('.sd-cmp-mRjLD.sd-cmp-GgdFU.sd-cmp-Jou6v').first();
            if (await cookieButton.isVisible({ timeout: 3000 })) {
                await cookieButton.click();
            }
        } catch (e) {
            console.log("No cookie banner");
        }
    }

    async expectPageLoaded() {
        const { expect } = await import('@playwright/test');
        await expect(this.page).toHaveURL(/uncompagnon/);
    }
}