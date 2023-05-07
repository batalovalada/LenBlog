//=========================VALIDATION============================
function formValidation(form) {
    /* Remove Error */
    function removeError(input) {
        const parent = input.parentNode;

        if (parent.classList.contains('form__error')) {
            parent.querySelector('.form__error-label').remove();
            parent.classList.remove('form__error');
        }
    }


    /* Create Error */
    function createError(input, errorText) {
        const parent = input.parentNode;
        const errorLabel = document.createElement('label');

        errorLabel.classList.add('form__error-label');
        errorLabel.textContent = errorText;
        parent.classList.add('form__error');
        parent.append(errorLabel);

    }

    let result = true;
    const allInputs = form.querySelectorAll('input, textarea');

    for (const input of allInputs) {
        removeError(input);

        if (input.dataset.email == "true") {
            if (!input.value.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)) {
                removeError(input);
                createError(input, 'Email введён неверно!');
                result = false;
            }
        }

        if (input.dataset.required == "true") {
            if (input.value == "") {
                removeError(input);
                createError(input, 'Поле не заполнено!');
                result = false;
            }
        }
    }

    return result
}


document.getElementById('messageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    if (formValidation(this) == true) {
        alert('Сообшение отправлено успешно!');
    }
});