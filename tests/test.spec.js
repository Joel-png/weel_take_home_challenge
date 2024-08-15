const { test, expect } = require('@playwright/test');
import { BusinessSignupPage } from '../pages/business-signup';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-moccona.letsweel.com/app/business-signup');
});

test.describe('Check business signup elements visibility', () => {

    test('Verify "registration email" input field visibility', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        const registrationEmailInputFieldVisible = await businessSignupPage.isRegistrationEmailInputFieldVisible();

        expect(registrationEmailInputFieldVisible).toBe(true);
    })
})
