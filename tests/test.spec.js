const { test, expect } = require('@playwright/test');
import { BusinessSignupPage } from '../pages/business-signup';

/*
- The user should be able to enter a work email and valid password before pressing “Sign
up with email” and navigating to the /personal-info page.

    Test 07


- Each field should show an error message if they are unpopulated

    Test 01 - email input
    Test 05 - password input


- The email field should only accept valid work emails.

    Test 03 - invalid email, valid password


- You should not be able to sign up a user that you have already signed up.

    Test 04 - Existing email, valid password


- If either the password or email don’t meet the requirements, error messages should
show.

    Test 01 - no email, no password
    Test 03 - invalid email, valid password
    Test 06 - valid email, invalid password

*/

test.beforeEach(async ({ page }) => {
    await page.goto('https://app-moccona.letsweel.com/app/business-signup');
});

test.describe('Test business signup page functionality', () => {
    const existingEmail = "test@example.com";
    const newEmail = `testuser+${Date.now()}@example.com`;
    const validPassword = "Test123!";
    const invalidPassword = "NONUMBERs";

    const personalInfoURL = "https://app-moccona.letsweel.com/app/personal-info";
    
    test('00 Verify registration email input field visibility', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        const registrationEmailInputFieldVisible = await businessSignupPage.isRegistrationEmailInputFieldVisible();

        expect(registrationEmailInputFieldVisible).toBe(true);
    })

    test('01 Verify error message shows for email input when submit button pressed with no string entered', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.clickRegistrationSubmitButton();
        const registrationEmailErrorMessageVisible = await businessSignupPage.isRegistrationEmailErrorMessageVisible();

        expect(registrationEmailErrorMessageVisible).toBe(true);
    })

    test('02 Verify password input field visibility when string entered', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail('Foo');
        await businessSignupPage.clickRegistrationSubmitButton();
        const registrationPasswordInputFieldVisible = await businessSignupPage.isRegistrationPasswordInputFieldVisible();

        expect(registrationPasswordInputFieldVisible).toBe(true);
    })
    
    test('03 Verify error message shows for email input when signup button pressed with invalid work email entered', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail('Foo');
        await businessSignupPage.clickRegistrationSubmitButton();
        await businessSignupPage.enterPassword(validPassword);
        await businessSignupPage.checkRegistrationCheckbox();
        await businessSignupPage.clickRegistrationSignupButton();
        await businessSignupPage.waitForRegistrationErrorMessage();
        const registrationEmailErrorMessageVisible = await businessSignupPage.isRegistrationEmailErrorMessageVisible();

        expect(registrationEmailErrorMessageVisible).toBe(true);
    })

    test('04 Verify error message shows for email input when signup button pressed with existing work email entered', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail(existingEmail);
        await businessSignupPage.clickRegistrationSubmitButton();
        await businessSignupPage.enterPassword(validPassword);
        await businessSignupPage.checkRegistrationCheckbox();
        await businessSignupPage.clickRegistrationSignupButton();
        await businessSignupPage.waitForExistingEmailErrorMessage();
        const ExistingEmailErrorMessageVisible = await businessSignupPage.isExistingEmailErrorMessageVisible();

        expect(ExistingEmailErrorMessageVisible).toBe(true);
    })

    test('05 Verify error icon(s) show for password input is left empty', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail('Foo');
        await businessSignupPage.clickRegistrationSubmitButton();
        await businessSignupPage.enterPassword('');
        await businessSignupPage.blurPassword();
        const registrationPasswordErrorIconVisible = await businessSignupPage.isRegistrationPasswordErrorIconVisible();

        expect(registrationPasswordErrorIconVisible).toBe(true);
    })

    test('06 Verify error icon(s) show for password input when password doesnt meet the requirements', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail('Foo');
        await businessSignupPage.clickRegistrationSubmitButton();
        await businessSignupPage.enterPassword(invalidPassword);
        await businessSignupPage.blurPassword();
        const registrationPasswordErrorIconVisible = await businessSignupPage.isRegistrationPasswordErrorIconVisible();

        expect(registrationPasswordErrorIconVisible).toBe(true);
    })
    
    test('07 Test signup with valid email and password redirects to correct url', async ({page}) => {
        const businessSignupPage = new BusinessSignupPage(page);
        await businessSignupPage.enterRegistrationEmail(newEmail);
        await businessSignupPage.clickRegistrationSubmitButton();
        await businessSignupPage.enterPassword(validPassword);
        await businessSignupPage.checkRegistrationCheckbox();
        await businessSignupPage.clickRegistrationSignupButton();

        await expect(page).toHaveURL(personalInfoURL);
    })
})
