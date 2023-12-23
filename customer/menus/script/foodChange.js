let foodChoice = document.querySelectorAll('#categories ul li');
let lastActiveBtn = 0;
const removeActiveBtn = () => {
    foodChoice[lastActiveBtn].classList.remove('activeBtn');
}
const addActiveBtn = (a) => {
    foodChoice[a].classList.add('activeBtn');
    lastActiveBtn = a;
}
foodChoice[0].classList.add('activeBtn');
foodChoice.forEach(element => {
    element.addEventListener('click', () => {
        removeActiveBtn();
        switch (element.innerText) {
            case 'Veg Thali':
                foodContainer.style.transform = `translateX(-0%)`;
                listFrame = 0;
                frameWidth = 0;
                break;

            case 'Non-veg Thali':
                foodContainer.style.transform = `translateX(-20.1%)`;
                listFrame = 1;
                frameWidth = 20.10;
                break;

            case 'Fast food':
                foodContainer.style.transform = `translateX(-40.1%)`;
                listFrame = 2;
                frameWidth = 40.20;
                break;

            case 'Hot drinks':
                foodContainer.style.transform = `translateX(-60.2%)`;
                listFrame = 3;
                frameWidth = 60.40;
                break;

            case 'Soft drinks':
                foodContainer.style.transform = `translateX(-80.3%)`;
                listFrame = 4;
                frameWidth = 80.50;
                break;
        }
        addActiveBtn(listFrame);
    })
});

const foodItemContainers = document.querySelectorAll('.Items');
i = 0;

foodItemContainers.forEach(item => {
    restaurentFoodItems[i++].forEach(element => {
        item.innerHTML += `<div class="food" id="${element.id}">
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

});
