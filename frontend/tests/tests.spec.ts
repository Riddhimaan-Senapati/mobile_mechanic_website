import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
    test('account landing flow', async ({ page }) => {
        await page.goto('http://localhost:3000/customer_landing'); // go straight to account landing page 
        await expect(page.locator('h1')).toContainText('Account Information');
        await page.getByRole('button', { name: 'Messages' }).click();
        await expect(page.getByRole('heading', { name: 'Messaging' })).toBeVisible();
        await page.getByRole('button', { name: 'John Doe' }).click();
        await page.getByRole('button', { name: 'Create Appointment' }).click();
        await expect(page.getByRole('heading', { name: 'Create Booking' })).toBeVisible();
        await page.getByRole('button', { name: 'John Doe' }).click();
        await page.getByRole('button', { name: 'Billing' }).click();
        await expect(page.getByRole('heading', { name: 'Billing' })).toBeVisible();
        await page.getByRole('button', { name: 'John Doe' }).click();
    });

    test('zip code validation', async ({ page }) => {
        await page.goto('http://localhost:3000/');
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).click();
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).fill('12345');
        await page.getByRole('button', { name: 'Go' }).click();
        await expect(page.getByText('Sorry, we don\'t currently')).toBeVisible();
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).click();
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).fill('01000');
        await page.getByRole('button', { name: 'Go' }).click();
        await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
    });
}); 
