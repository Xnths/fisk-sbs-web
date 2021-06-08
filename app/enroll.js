const inputs = document.querySelectorAll('.input');

inputs.forEach(input => {
    input.addEventListener('blur', event => {
        validate(event.target);
    })
})

const typesOfError = [
    'valueMissing',
    'patternMismatch',
    'customError'
]

function getMessage(inputType, input) {
    let message = '';

    typesOfError.forEach(error => {
        if (input.validity[error]) {
            message = errorMessage[inputType][error]
        }
    })

    return message;
}

const errorMessage = {
    name: {
        valueMissing: "The name field cannot be empty.",
        patternMismatch: "Please entry your full name."
    },
    birthday: {
        valueMissing: "The birthday field cannot be empty",
        customError: "You must be 18 to enroll."
    },
    email: {
        valueMissing: "The email field cannot be empty.",
        patternMismatch: "Please use a valid email."
    },
    password: {
        valueMissing: "The password field cannot be empty.",
        patternMismatch: "Password must contain at least one number, lower and upper case letter."
    },
    confirmPassword: {
        valueMissing: "The password field cannot be empty."
    },
    cellphone: {
        valueMissing: "The cellphone field cannot be empty."
    },
    CEP: {
        valueMissing: "The CEP field cannot be empty.",
        patternMismatch: "CEP is invalid.",
        customError: "It wasn't possible to retrive the location data."
    },
    city: {
        valueMissing: "The city field cannot be empty."
    },
    neighborhood: {
        valueMissing: "The neighborhood field cannot be empty."
    }
}

function validate(input) {
    const type = input.dataset.type;

    if (validation[type]) {
        validation[type](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.enroll__error-message').innerHTML = ""
    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.enroll__error-message').innerHTML = getMessage(type, input);
    }
}

const validation = {
    birthday: input => verifyAge(input),
    CEP: input => retriveCEP(input)
}

function fillAddressFields(data) {
    const city = document.querySelector('[data-type="city"]');
    const neighborhood = document.querySelector('[data-type="neighborhood"]');

    city.value = data.localidade;
    neighborhood.value = data.bairro;
}

function retriveCEP(input) {
    const cep = input.value.replace(/\D/g, '');

    if (!input.validity.patternMismatch && !input.validity.valueMissing) {
        fetch(`https://viacep.com.br/ws/${cep}/json`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    input.setCustomValidity("It wasn't possible to retrive the location data.")
                    return;
                }
                input.setCustomValidity('');
                fillAddressFields(data);
            });
    }
}

function verifyAge(input) {
    const incommingDate = new Date(input.value);
    let message = ''

    if (!isGreaterThan18(incommingDate)) {
        message = "You must be 18 years old or more to enroll the course"
    }

    input.setCustomValidity(message);
}

function isGreaterThan18(date) {
    const today = new Date();
    const datePlus18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());

    return datePlus18 <= today;
}