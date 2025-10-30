import { test, expect } from '@playwright/test';
const path = require('path');

const baseLink = 'http://localhost:3000/'; 

test.describe('navigation', () => {
    test('account landing flow', async ({ page }) => {
        await page.goto(baseLink + 'customer_landing'); // go straight to account landing page 
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
        await page.goto(baseLink);
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).click();
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).fill('12345');
        await page.getByRole('button', { name: 'Go' }).click();
        await expect(page.getByText('Sorry, we don\'t currently')).toBeVisible();
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).click();
        await page.getByRole('textbox', { name: 'Five-digit zip code' }).fill('01000');
        await page.getByRole('button', { name: 'Go' }).click();
        await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
    });

    test('nav between home & account landing (signed-in user)', async ({ page }) => {
        await page.goto(baseLink);
        await expect(page.locator('section').filter({ hasText: 'Are we in your area?Go' })).toBeVisible();
        await page.getByRole('button', { name: 'John Doe' }).click();
        await expect(page.locator('div').filter({ hasText: /^Account Information$/ })).toBeVisible();
        await page.getByRole('button', { name: 'Mobile Mechanic' }).click();
        await expect(page.locator('section').filter({ hasText: 'Are we in your area?Go' })).toBeVisible();
    });

    test('cancel booking', async ({ page }) => {
        await page.goto(baseLink + 'create_booking');
        await expect(page.getByRole('heading', { name: 'Create Booking' })).toBeVisible();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page.getByRole('heading', { name: 'Account Information' })).toBeVisible();
    });

    test('modify/cancel modify booking', async ({ page }) => {
        await page.goto(baseLink + 'customer_landing');
        await expect(page.getByText('Monday, December 29,')).toBeVisible();
        await page.getByRole('button', { name: 'Modify Booking' }).click();
        await expect(page.getByText('Date')).toBeVisible();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await expect(page.getByText('Monday, December 29,')).toBeVisible();
    });
}); 

test.describe('form functions', () => {
    test('save booking edits', async ({ page }) => {
        await page.goto(baseLink + 'customer_landing');
        await expect(page.getByText('Address: 620 Massachusetts')).toBeVisible();
        await page.getByRole('button', { name: 'Modify Booking' }).click();
        await expect(page.getByRole('textbox').nth(2)).toBeVisible();
        await page.getByRole('textbox').nth(2).click();
        await page.getByRole('textbox').nth(2).press('ControlOrMeta+ArrowLeft');
        await page.getByRole('textbox').nth(2).press('ArrowRight');
        await page.getByRole('textbox').nth(2).press('ArrowRight');
        await page.getByRole('textbox').nth(2).fill('630 Massachusetts Ave, Amherst, MA');
        await page.getByRole('button', { name: 'Save Changes' }).click();
        await expect(page.getByText('Address: 630 Massachusetts')).toBeVisible();
    });

    test('upload image', async ({ page }) => {
        await page.goto(baseLink + 'create_booking');
        await page.getByRole('button', { name: 'Upload Image' }).click();
        await page.getByRole('button', { name: 'Upload Image' }).setInputFiles(path.join(__dirname, 'mobmechlogo.png'));
        await expect(page.getByRole('img', { name: 'Preview' })).toBeVisible();
    });
}); 