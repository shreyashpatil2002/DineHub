let foodChoice = document.querySelectorAll('#categories ul li');
const foodItemContainer = document.getElementById('food-Items');

foodChoice[0].addEventListener('click', () => {
    changeFoodList(vegThaliFood, 0);
})

foodChoice[1].addEventListener('click', () => {
    changeFoodList(nonVegThali, 1);
})

foodChoice[2].addEventListener('click', () => {
    changeFoodList(fastFood, 2);
})

foodChoice[3].addEventListener('click', () => {
    changeFoodList(hotDrinks, 3);
})

foodChoice[4].addEventListener('click', () => {
    changeFoodList(softDrinks, 4);
})

const changeFoodList = (item, btn) => {
    foodItemContainer.innerHTML = '';
    foodChoice.forEach(element => {
        element.classList.remove('activeBtn');
    });
    foodChoice[btn].classList.add('activeBtn');
    item.forEach(element => {
        foodItemContainer.innerHTML += `<div class="food" id="${element.id}">
                <div class="details">
                    <h2 class="name">${element.Name}</h2>
                    <p>${element.description}</p>
                    <b>${element.price}</b>
                </div>
                <div class="foodImage">
                    <img src="${element.imageSrc}">
                </div>
            </div>`;
    })
    listFrame = btn;
}
changeFoodList(vegThaliFood, 0);