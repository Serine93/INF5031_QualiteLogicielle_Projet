import { Page, expect, Route } from '@playwright/test';

export class HtmlMockPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async setupMockWithDogResults() {
        await this.page.route('https://www.uncompagnon.fr/', async (route: Route) => {
            const mockHtml = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>unCompagnon.fr - Annonces D'animaux (MOCK)</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              background: #f5f5f5;
              padding: 20px;
            }
            .header {
              background: #2c3e50;
              color: white;
              padding: 20px;
              margin-bottom: 30px;
              border-radius: 8px;
            }
            .mock-badge {
              background: #e74c3c;
              color: white;
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 12px;
              display: inline-block;
              margin-left: 10px;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
            }
            .announcement {
              background: white;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 20px;
              margin: 15px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              transition: transform 0.2s;
            }
            .announcement:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            }
            .announcement h3 {
              color: #2c3e50;
              margin-bottom: 10px;
              font-size: 24px;
            }
            .announcement p {
              margin: 8px 0;
              line-height: 1.6;
              color: #555;
            }
            .announcement strong {
              color: #2c3e50;
              font-weight: 600;
            }
            .badge {
              display: inline-block;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 14px;
              margin-right: 10px;
            }
            .badge-lost {
              background: #e74c3c;
              color: white;
            }
            .badge-found {
              background: #27ae60;
              color: white;
            }
            .results-count {
              margin: 20px 0;
              color: #666;
              font-size: 18px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                unCompagnon.fr : Annonces D'animaux De Compagnie à Adopter
                <span class="mock-badge">MODE MOCK</span>
              </h1>
              <p>Trouvez votre compagnon idéal</p>
            </div>
            
            <div class="results-count">
              <strong>2 annonces</strong> trouvées
            </div>
            
            <div class="announcement" data-testid="animal-1">
              <h3>Max</h3>
              <div>
                <span class="badge badge-lost">Perdu</span>
              </div>
              <p><strong>Race:</strong> Labrador retriever</p>
              <p><strong>Catégorie:</strong> Chiens</p>
              <p><strong>Lieu:</strong> Paris</p>
              <p><strong>Description:</strong> Chien perdu dans le 15ème arrondissement</p>
            </div>
            
            <div class="announcement" data-testid="animal-2">
              <h3>Luna</h3>
              <div>
                <span class="badge badge-found">Trouvé</span>
              </div>
              <p><strong>Race:</strong> Golden Retriever</p>
              <p><strong>Catégorie:</strong> Chiens</p>
              <p><strong>Lieu:</strong> Lyon</p>
              <p><strong>Description:</strong> Chien trouvé près du parc</p>
            </div>
          </div>
        </body>
        </html>
      `;

            await route.fulfill({
                status: 200,
                contentType: 'text/html; charset=utf-8',
                body: mockHtml
            });
        });
    }

    async setupMockWithEmptyResults() {
        await this.page.route('https://www.uncompagnon.fr/', async (route: Route) => {
            const mockHtml = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>unCompagnon.fr - Aucun résultat (MOCK)</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              background: #f5f5f5;
              padding: 20px;
            }
            .header {
              background: #2c3e50;
              color: white;
              padding: 20px;
              margin-bottom: 30px;
              border-radius: 8px;
            }
            .mock-badge {
              background: #e74c3c;
              color: white;
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 12px;
              display: inline-block;
              margin-left: 10px;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
            }
            .empty-state {
              background: white;
              text-align: center;
              padding: 60px 40px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .empty-state h2 {
              color: #2c3e50;
              font-size: 28px;
              margin-bottom: 15px;
            }
            .empty-state p {
              color: #666;
              font-size: 16px;
              line-height: 1.6;
            }
            .empty-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                unCompagnon.fr : Recherche d'animaux
                <span class="mock-badge">MODE MOCK</span>
              </h1>
            </div>
            
            <div class="empty-state" data-testid="empty-results">
              <div class="empty-icon">🔍</div>
              <h2>Aucune annonce trouvée</h2>
              <p>Désolé, nous n'avons trouvé aucune annonce correspondant à vos critères.</p>
              <p>Essayez de modifier vos critères de recherche ou revenez plus tard.</p>
            </div>
          </div>
        </body>
        </html>
      `;

            await route.fulfill({
                status: 200,
                contentType: 'text/html; charset=utf-8',
                body: mockHtml
            });
        });
    }

    async setupMockWithError() {
        await this.page.route('https://www.uncompagnon.fr/', async (route: Route) => {
            const mockHtml = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>unCompagnon.fr - Erreur (MOCK)</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              background: #f5f5f5;
              padding: 20px;
            }
            .header {
              background: #2c3e50;
              color: white;
              padding: 20px;
              margin-bottom: 30px;
              border-radius: 8px;
            }
            .mock-badge {
              background: #e74c3c;
              color: white;
              padding: 5px 10px;
              border-radius: 4px;
              font-size: 12px;
              display: inline-block;
              margin-left: 10px;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
            }
            .error {
              background: #fff5f5;
              border: 2px solid #e74c3c;
              border-radius: 8px;
              padding: 40px;
              text-align: center;
              box-shadow: 0 2px 4px rgba(231, 76, 60, 0.2);
            }
            .error h2 {
              color: #e74c3c;
              font-size: 28px;
              margin-bottom: 15px;
            }
            .error p {
              color: #c0392b;
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
            }
            .error-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            .error-code {
              background: #e74c3c;
              color: white;
              display: inline-block;
              padding: 8px 16px;
              border-radius: 4px;
              font-weight: bold;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>
                unCompagnon.fr
                <span class="mock-badge">MODE MOCK - ERROR</span>
              </h1>
            </div>
            
            <div class="error" data-testid="error-message" role="alert">
              <div class="error-icon">⚠️</div>
              <h2>Une erreur est survenue</h2>
              <p>Impossible de charger les résultats pour le moment.</p>
              <p>Veuillez réessayer plus tard ou contacter le support si le problème persiste.</p>
              <div class="error-code">ERREUR 500</div>
            </div>
          </div>
        </body>
        </html>
      `;

            await route.fulfill({
                status: 500,
                contentType: 'text/html; charset=utf-8',
                body: mockHtml
            });
        });
    }

    async goTo() {
        await this.page.goto('https://www.uncompagnon.fr/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(500);
    }

    async expectPageLoaded(scenario?: 'dogs' | 'empty' | 'error') {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(500);

        if (scenario === 'dogs') {
            await expect(this.page.locator('text=Max')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('text=Luna')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('text=Labrador retriever')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('text=Golden Retriever')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('.mock-badge')).toBeVisible();
        } else if (scenario === 'empty') {
            await expect(this.page.locator('[data-testid="empty-results"]')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('text=Aucune annonce trouvée')).toBeVisible({ timeout: 5000 });
            const announcementCount = await this.page.locator('.announcement').count();
            expect(announcementCount).toBe(0);
        } else if (scenario === 'error') {
            await expect(this.page.locator('[data-testid="error-message"]')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('text=Une erreur est survenue')).toBeVisible({ timeout: 5000 });
            await expect(this.page.locator('text=ERREUR 500')).toBeVisible({ timeout: 5000 });
        }
    }
}