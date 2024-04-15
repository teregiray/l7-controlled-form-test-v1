import axios from 'axios';

const myFunction = () => {
  const validateName = (name) => /^[a-zA-Z]+$/.test(name);
  const validatePhone = (phone) => /^([+]?[0-9\s-]{3,10})*$/i.test(phone);

  const state = {
    validateName: false,
    validatePhone: false,
  };
  const mainDiv = document.querySelector('.form-container');
  mainDiv.innerHTML = `<form id="registrationForm">
    <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Input name" name="name" required>
    </div>
    <div class="form-group">
        <label for="inputPhone">Phone</label>
        <input type="text" class="form-control" id="inputPhone" placeholder="Input phone" name="phone" required>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary">
</form>`;

  const form = document.querySelector('form');
  const submit = document.querySelector('.btn');

  const addClass = (input) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  };
  const removeClass = (input) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  };

  const inputName = document.querySelector('#inputName');
  const inputPhone = document.querySelector('#inputPhone');

  inputName.addEventListener('input', (e) => {
    const name = e.target.value.trim();
    if (validateName(name)) {
      state.validateName = true;
      addClass(inputName);
    } else {
      state.validateName = false;
      removeClass(inputName);
    }
    if (state.validatePhone && state.validateName) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  });

  inputPhone.addEventListener('input', (e) => {
    const email = e.target.value.trim();

    if (validatePhone(email)) {
      state.validatePhone = true;
      inputPhone.classList.add('is-valid');
      inputPhone.classList.remove('is-invalid');
    } else {
      state.validatePhone = false;
      inputPhone.classList.remove('is-valid');
      inputPhone.classList.add('is-invalid');
    }
    if (state.validatePhone && state.validateName) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await axios.post('/people', { name: '', email: '' });
    document.body.innerHTML = '<h3 class="mb-4">User successfully registered</h3>';
  });
};

export default myFunction;
