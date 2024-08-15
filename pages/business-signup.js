export class BusinessSignupPage {
    constructor(page) {
        this.page = page;
  
        this.registrationEmailInputField = page.getByTestId('registration-email');
        this.registrationSubmitButton = page.getByTestId('submit-button');
        this.registrationEmailErrorMessage = page.getByTestId('form-input-wrapper-error-text');
        this.existingEmailErrorMessage = page.getByTestId('registration-email-subtext-container');

        this.registrationPasswordInputField = page.getByTestId('registration-password');
        this.registrationCheckbox = page.getByTestId('registration-terms');
        this.registrationSignupButton = page.getByTestId('email-sign-up');
        this.registrationPasswordErrorIcon = page.getByTestId('ds-alert-error-icon ds-exclamation-circle-icon');

    }

    async isRegistrationEmailInputFieldVisible() {
        const registrationEmailInputField = this.registrationEmailInputField;
        return await registrationEmailInputField.isVisible();
    }

    async isRegistrationEmailErrorMessageVisible() {
        const registrationEmailErrorMessage = this.registrationEmailErrorMessage;
        return await registrationEmailErrorMessage.isVisible();
    }

    async isExistingEmailErrorMessageVisible() {
        const existingEmailErrorMessage = this.existingEmailErrorMessage;
        return await existingEmailErrorMessage.isVisible();
    }

    async isRegistrationPasswordInputFieldVisible() {
        const registrationPasswordInputField = this.registrationPasswordInputField;
        return await registrationPasswordInputField.isVisible();
    }

    async isRegistrationPasswordErrorIconVisible() {
        const registrationPasswordErrorIcon = this.registrationPasswordErrorIcon;
        const errorCount = await registrationPasswordErrorIcon.count();
        return errorCount > 0;
    }

    async enterRegistrationEmail(email) {
        const registrationEmailInputField = this.registrationEmailInputField;
        await registrationEmailInputField.fill(email);
    }

    async enterPassword(password) {
        const registrationPasswordInputField = this.registrationPasswordInputField;
        await registrationPasswordInputField.fill(password);
    }

    async blurPassword() {
        const registrationPasswordInputField = this.registrationPasswordInputField;
        await registrationPasswordInputField.blur();
    }

    async clickRegistrationSubmitButton() {
        const registrationSubmitButton = this.registrationSubmitButton;
        await registrationSubmitButton.click();
    }

    async clickRegistrationSignupButton() {
        const registrationSignupButton = this.registrationSignupButton;
        await registrationSignupButton.click();
    }

    async checkRegistrationCheckbox() {
        const registrationCheckbox = this.registrationCheckbox;
        await registrationCheckbox.click();
    }

    async waitForRegistrationErrorMessage() {
        const registrationEmailErrorMessage = this.registrationEmailErrorMessage;
        await registrationEmailErrorMessage.waitFor({ state: 'visible' });
    }

    async waitForExistingEmailErrorMessage() {
        const existingEmailErrorMessage = this.existingEmailErrorMessage;
        await existingEmailErrorMessage.waitFor({ state: 'visible' });
    }
}