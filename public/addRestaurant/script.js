let inputFields = document.querySelectorAll('.form form input');
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
    })
});
