import axios from 'axios';

const myFunction = () => {
  const mainDiv = document.querySelector('.form-container');
  const form = document.createElement('form');
  form.innerHTML = `<form id="registrationForm">
    <div class="form-group">
        <label for="inputName">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Введите ваше имя" name="name" required>
    </div>
    <div class="form-group">
        <label for="inputEmail">Email</label>
        <input type="text" class="form-control" id="inputEmail" placeholder="Введите email" name="email" required>
    </div>
    <input type="submit" value="Submit" class="btn btn-primary">
</form>`;
  mainDiv.appendChild(form);

  const submitButton = document.querySelector('input[type="submit"]');
  const inputName = document.querySelector('input[id="inputName"]');
  const inputEmail = document.querySelector('input[id="inputEmail"]');

  const isValidName = (name) => /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/.test(name);
  const isValidEmail = (email) => /^[\w\d.]+@[\w\d.]+$/.test(email);

  const addClass = (input) => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
  };
  const removeClass = (input) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  };

  const validateInputs = () => {
    const name = inputName.value.trim();
    const email = inputEmail.value.trim();
    const nameIsValid = isValidName(name);
    const emailIsValid = isValidEmail(email);

    if (nameIsValid) {
      addClass(inputName);
    } else {
      removeClass(inputName);
    }

    if (emailIsValid) {
      addClass(inputEmail);
    } else {
      removeClass(inputEmail);
    }

    if (nameIsValid && emailIsValid) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  };

  inputName.addEventListener('input', validateInputs);
  inputEmail.addEventListener('input', validateInputs);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios.post('/users', {
      name: formData.get('name'),
      email: formData.get('email'),
    })
      .then((res) => {
        console.log(res);
        document.body.innerHTML = `<p>${res.data.message}</p>.`;
      }).catch((error) => {
        console.error(error);
      });
  });
};
export default myFunction;
