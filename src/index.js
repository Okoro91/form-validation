import "./styles.css";
import FormValidator from "./formValidator";

const app = document.getElementById("app");

app.innerHTML = `<h1>Create Your Account</h1>

<form id="registrationForm" novalidate>
  <div class="form-group">
    <label for="email">Email Address *</label>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="you@example.com"
      required
    />
    <div class="error-message" id="email-error"></div>
  </div>

  <div class="form-group">
  <label for="country">Country *</label>
  <select id="country" name="country" required>
    <option value="">Select a country</option>

    <!-- West African Countries -->
    <option value="NG">Nigeria</option>
    <option value="GH">Ghana</option>
    <option value="CI">Côte d'Ivoire</option>
    <option value="SN">Senegal</option>
    <option value="ML">Mali</option>
    <option value="NE">Niger</option>
    <option value="BF">Burkina Faso</option>
    <option value="TG">Togo</option>
    <option value="BJ">Benin</option>
    <option value="GM">Gambia</option>
    <option value="GN">Guinea</option>
    <option value="GW">Guinea-Bissau</option>
    <option value="LR">Liberia</option>
    <option value="SL">Sierra Leone</option>
    <option value="CV">Cape Verde</option>
    <option value="CM">Cameroon</option>
    <option value="CG">Congo</option>
    <option value="other">Other</option>
  </select>

  <div class="error-message" id="country-error"></div>
</div>


  <div class="form-group">
    <label for="postalCode">Postal Code *</label>
    <input
      type="text"
      id="postalCode"
      name="postalCode"
      placeholder="e.g., 104101"
      required
    />
    <div class="error-message" id="postalCode-error"></div>
  </div>

  <div class="form-group">
    <label for="password">Password *</label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Minimum 8 characters"
      required
    />
    <div class="error-message" id="password-error"></div>
  </div>

  <div class="form-group">
    <label for="confirmPassword">Confirm Password *</label>
    <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      placeholder="Re-enter your password"
      required
    />
    <div class="error-message" id="confirmPassword-error"></div>
  </div>

  <button type="submit" class="submit-btn">Create Account</button>
</form>

<div id="form-message" class="form-message"></div>
</div>`;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const formValidator = new FormValidator(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidator.handleSubmit();
  });
});
