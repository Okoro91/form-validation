export default class FormValidator {
  constructor(form) {
    this.form = form;
    this.fields = {
      email: this.form.querySelector("#email"),
      country: this.form.querySelector("#country"),
      postalCode: this.form.querySelector("#postalCode"),
      password: this.form.querySelector("#password"),
      confirmPassword: this.form.querySelector("#confirmPassword"),
    };

    this.errorElements = {
      email: this.form.querySelector("#email-error"),
      country: this.form.querySelector("#country-error"),
      postalCode: this.form.querySelector("#postalCode-error"),
      password: this.form.querySelector("#password-error"),
      confirmPassword: this.form.querySelector("#confirmPassword-error"),
    };

    this.formMessage = document.getElementById("form-message");

    this.init();
  }

  init() {
    this.fields.email.addEventListener("input", () => this.validateEmail());
    this.fields.email.addEventListener("blur", () => this.validateEmail());

    this.fields.country.addEventListener("change", () => {
      this.validateCountry();
      this.validatePostalCode();
    });
    this.fields.country.addEventListener("blur", () => this.validateCountry());

    this.fields.postalCode.addEventListener("input", () =>
      this.validatePostalCode()
    );
    this.fields.postalCode.addEventListener("blur", () =>
      this.validatePostalCode()
    );

    this.fields.password.addEventListener("input", () =>
      this.validatePassword()
    );
    this.fields.password.addEventListener("blur", () =>
      this.validatePassword()
    );

    this.fields.confirmPassword.addEventListener("input", () =>
      this.validateConfirmPassword()
    );
    this.fields.confirmPassword.addEventListener("blur", () =>
      this.validateConfirmPassword()
    );
  }

  validateEmail() {
    const email = this.fields.email.value.trim();
    const errorElement = this.errorElements.email;

    if (!email) {
      this.showError(this.fields.email, errorElement, "Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError(
        this.fields.email,
        errorElement,
        "Please enter a valid email address"
      );
      return false;
    }

    this.showSuccess(this.fields.email, errorElement);
    return true;
  }

  validateCountry() {
    const country = this.fields.country.value;
    const errorElement = this.errorElements.country;

    if (!country) {
      this.showError(
        this.fields.country,
        errorElement,
        "Please select a country"
      );
      return false;
    }

    this.showSuccess(this.fields.country, errorElement);
    return true;
  }

  validatePostalCode() {
    const postalCode = this.fields.postalCode.value.trim().toUpperCase();
    const country = this.fields.country.value;
    const errorElement = this.errorElements.postalCode;

    if (!postalCode) {
      this.showError(
        this.fields.postalCode,
        errorElement,
        "Postal code is required"
      );
      return false;
    }

    let isValid = false;
    let errorMessage = "Invalid postal code for selected country";

    switch (country) {
      case "NG":
        isValid = /^\d{6}$/.test(postalCode);
        if (!isValid) errorMessage = "Postal code must be 6 digits (Nigeria)";
        break;
      case "GH":
        isValid =
          /^[A-Z]{2}-?\d{3,4}-?\d{3,4}$/i.test(postalCode) ||
          postalCode.length > 0;
        if (!isValid)
          errorMessage =
            "Enter a valid Ghana digital address or any non-empty value";
        break;
      case "CI":
      case "SN":
      case "ML":
      case "NE":
      case "BF":
      case "TG":
      case "BJ":
      case "GM":
      case "GN":
      case "GW":
      case "LR":
      case "SL":
      case "CV":
      case "CM":
      case "CG":
        isValid = postalCode.length > 0;
        if (!isValid) errorMessage = "Postal code is required";
        break;

      default:
        isValid = postalCode.length > 0;
        errorMessage = "Postal code is required";
    }

    if (!isValid) {
      this.showError(this.fields.postalCode, errorElement, errorMessage);
      return false;
    }

    this.showSuccess(this.fields.postalCode, errorElement);
    return true;
  }

  validatePassword() {
    const password = this.fields.password.value;
    const errorElement = this.errorElements.password;

    if (!password) {
      this.showError(
        this.fields.password,
        errorElement,
        "Password is required"
      );
      return false;
    }

    const errors = [];

    if (password.length < 8) {
      errors.push("at least 8 characters");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("one lowercase letter");
    }
    if (!/\d/.test(password)) {
      errors.push("one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("one special character");
    }

    if (errors.length > 0) {
      this.showError(
        this.fields.password,
        errorElement,
        `Password must contain: ${errors.join(", ")}`
      );
      return false;
    }

    this.showSuccess(this.fields.password, errorElement);
    return true;
  }

  validateConfirmPassword() {
    const password = this.fields.password.value;
    const confirmPassword = this.fields.confirmPassword.value;
    const errorElement = this.errorElements.confirmPassword;

    if (!confirmPassword) {
      this.showError(
        this.fields.confirmPassword,
        errorElement,
        "Please confirm your password"
      );
      return false;
    }

    if (password !== confirmPassword) {
      this.showError(
        this.fields.confirmPassword,
        errorElement,
        "Passwords do not match"
      );
      return false;
    }

    this.showSuccess(this.fields.confirmPassword, errorElement);
    return true;
  }

  showError(field, errorElement, message) {
    field.classList.add("error");
    field.classList.remove("valid");
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  showSuccess(field, errorElement) {
    field.classList.remove("error");
    field.classList.add("valid");
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }

  validateAll() {
    const validations = [
      this.validateEmail(),
      this.validateCountry(),
      this.validatePostalCode(),
      this.validatePassword(),
      this.validateConfirmPassword(),
    ];

    return validations.every((validation) => validation === true);
  }

  handleSubmit() {
    const isValid = this.validateAll();

    if (isValid) {
      this.showFormMessage(
        "🎉 High five! Form submitted successfully!",
        "high-five"
      );

      setTimeout(() => {
        this.form.reset();
        this.formMessage.classList.remove("show", "high-five");

        Object.values(this.fields).forEach((field) => {
          field.classList.remove("error", "valid");
        });
        Object.values(this.errorElements).forEach((errorElement) => {
          errorElement.textContent = "";
          errorElement.classList.remove("show");
        });
      }, 3000);
    } else {
      this.showFormMessage("Please fix all errors before submitting", "error");
    }
  }

  showFormMessage(message, type) {
    this.formMessage.textContent = message;
    this.formMessage.className = "form-message";
    this.formMessage.classList.add(type, "show");
  }
}
