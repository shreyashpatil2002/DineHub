let inputFields = document.querySelectorAll('.form form input');
let showPassBtn = document.querySelector('.form form div img')
inputFields.forEach(element => {
    let placeholderText;
    element.addEventListener('focusin', () => {
        placeholderText = element.getAttribute('placeholder')
        element.removeAttribute('placeholder')
        if(element.getAttribute('type') == 'password') {
            showPassBtn.style.display = 'block';
        }
    })
    element.addEventListener('focusout', () => {
        element.setAttribute('placeholder', `${placeholderText}`)
        if(element.value != '' && element.getAttribute('type') == 'password') {
            showPassBtn.style.display = 'block';
        }
        else {
            showPassBtn.style.display = 'none';
        }
    })
});

showPassBtn.addEventListener('click', () => {
    if(inputFields[1].getAttribute('type') == 'password') {
        inputFields[1].setAttribute('type', 'text');
        showPassBtn.setAttribute('src', '../Assets/images/eye-slash-solid.svg');
    }
    else {
        inputFields[1].setAttribute('type', 'password');
        showPassBtn.setAttribute('src', '../Assets/images/eye-solid.svg');
    }
})
