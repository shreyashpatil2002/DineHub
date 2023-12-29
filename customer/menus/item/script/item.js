let elementId = document.URL.split('=');
let main = document.getElementById('main');

restaurentFoodItems.forEach(element => {
    element.forEach(item => {
        if(item.id == elementId[2]) {
            main.innerHTML = `<div class="imgbox">
            <img src="../${item.imageSrc}" alt="food image">
            </div>
            <div class="detailsBox">
            <h1><i class="fa-solid fa-bookmark" style="color: rgba(206, 65, 206)"></i> ${item.Name}</h1>
            <p>${item.description}</p>
            <b>${item.price}</b>
            <div id="dots">
            <i class="fa-solid fa-circle"></i>
            <i class="fa-solid fa-circle"></i>
            <i class="fa-solid fa-circle"></i>
            </div>
            </div>`;
        }
    });
});

let quantityBtn = document.querySelectorAll('.form h4 button');
let quantity = 1;
let quantityDisplay = document.querySelector('.form h4 span');
quantityBtn[0].addEventListener('click', () => {
    if(quantity > 1) {
        quantity--;
        quantityDisplay.innerText = quantity;
    }
})
quantityBtn[1].addEventListener('click', () => {
    if(quantity < 10) {
        quantity++;
        quantityDisplay.innerText = quantity;
    }
})