export class BusinessSignupPage {
    constructor(page) {
        this.page = page;
        this.registrationEmailInputField = page.getByTestId('registration-email');
        this
    }

    async isRegistrationEmailInputFieldVisible() {
        const registrationEmailInputField = this.registrationEmailInputField;
        return await registrationEmailInputField.isVisible();
    }
}