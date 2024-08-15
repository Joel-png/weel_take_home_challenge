export class BusinessSignupPage {
    constructor(page) {
        this.page = page;
  
        this.registrationEmailInputField = page.getByTestId('registration-email');
        this.registrationSubmitButton = page.getByTestId('submit-button');
        this.registrationEmailErrorMessage = page.getByTestId('form-input-wrapper-error-text');

        this.registrationPasswordInputField = page.getByTestId('registration-password');
        this.registrationSignupButton = page.getByTestId('email-sign-up');
    }

    async isRegistrationEmailInputFieldVisible() {
        const registrationEmailInputField = this.registrationEmailInputField;
        return await registrationEmailInputField.isVisible();
    }

    async isRegistrationEmailErrorMessageVisible() {
        const registrationEmailErrorMessage = this.registrationEmailErrorMessage;
        return await registrationEmailErrorMessage.isVisible();
    }

    async isRegistrationPasswordInputFieldVisible() {
        const registrationPasswordInputField = this.registrationPasswordInputField;
        return await registrationPasswordInputField.isVisible();
    }

    async enterRegistrationEmail(email) {
        const registrationEmailInputField = this.registrationEmailInputField;
        await registrationEmailInputField.fill(email);
    }

    async enterPassword(password) {
        const registrationPasswordInputField = this.registrationPasswordInputField;
        await registrationPasswordInputField.fill(password);
    }

    async clickRegistrationSubmitButton() {
        const registrationSubmitButton = this.registrationSubmitButton;
        await registrationSubmitButton.click();
    }
}