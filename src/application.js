import axios from 'axios';


export default function() {
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
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form)
        // console.log(formData);
        axios.post('/users', {
            name: formData.get('name'),
            email: formData.get('email')
        })
        .then(res => {
            console.log(res);
            document.body.innerHTML = `<p>${res.data.message}</p>.`
        }
        ).catch(error => {
            console.error(error); 
      })
          
    });

    const isValidName = (name) => /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/.test(name);
    const isValidEmail = (email) => /^[\w\d.]+@[\w\d.]+$/.test(email);

    const addClass = (input) => {
        input.classList.remove('is-invalid')
        input.classList.add('is-valid');
        submitButton.disabled = false;
    };
    const removeClass = (input) => {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        submitButton.disabled = true;
    }
    const inputName = document.querySelector('input[id="inputName"]');
    inputName.addEventListener('input', (e) => {
        let name = e.target.value.trim();
        isValidName(name) === true ? addClass(inputName) : removeClass(inputName);
    });
    const inputEmail = document.querySelector('input[id="inputEmail"]'); 
    inputEmail.addEventListener('input', (e) => {
        let email = e.target.value;
        isValidEmail(email) === true ? addClass(inputEmail) : removeClass(inputEmail);
    })
}