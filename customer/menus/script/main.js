let foodItems = document.querySelectorAll('.food');

foodItems.forEach(element => {
    element.addEventListener('click', () => {
        let foodContent = new String(element.children[0].innerText);
        let itemDetails = foodContent.split('\n');
        document.getElementById('main').innerHTML = `<div class="imgbox">
        ${element.children[1].innerHTML}
        </div>
        <div class="detailsBox">
        <h1><i class="fa-solid fa-bookmark" style="color: rgba(206, 65, 206)"></i> ${itemDetails[0]}</h1>
        <p>${itemDetails[2]}</p>
        <b>${itemDetails[4]}</b>
        <div id="dots">
        <i class="fa-solid fa-circle"></i>
        <i class="fa-solid fa-circle"></i>
        <i class="fa-solid fa-circle"></i>
        </div>
        </div>`;
        document.getElementById('selectedItem').style = `display: block;width: 100vw;height: 100vh;`;
    });
});

let backToListBtn = document.querySelector('#top button');

backToListBtn.addEventListener('click', () => {
    document.getElementById('selectedItem').style = `display: none;width: 0vw;height: 0vh;`;
})