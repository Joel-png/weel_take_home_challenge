const { test, expect } = require('@playwright/test');
import { BusinessSignupPage } from '../pages/business-signup';

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-moccona.letsweel.com/app/business-signup');
});

test.describe('Test business signup functionality', () => {
    const existingEmail = "test@example.com"
    const newEmail = "newaccount@example.com"
    const validPassword = "Test123!"
    
    test('Verify "registration email" input field visibility', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        const registrationEmailInputFieldVisible = await businessSignupPage.isRegistrationEmailInputFieldVisible();

        expect(registrationEmailInputFieldVisible).toBe(true);
    })

    test('Verify error message shows when submit button pressed with no string entered', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.clickRegistrationSubmitButton();
        const registrationEmailErrorMessageVisible = await businessSignupPage.isRegistrationEmailErrorMessageVisible();

        expect(registrationEmailErrorMessageVisible).toBe(true);
    })

    test('Verify "password" input field visibility when string entered', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail("Foo");
        await businessSignupPage.clickRegistrationSubmitButton();
        const registrationPasswordInputFieldVisible = await businessSignupPage.isRegistrationPasswordInputFieldVisible();

        expect(registrationPasswordInputFieldVisible).toBe(true);
    })
})
