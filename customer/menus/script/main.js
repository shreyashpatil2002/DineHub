let foodItems = document.querySelectorAll('.food');

foodItems.forEach(element => {
    element.addEventListener('click', () => {
        let foodContent = new String(element.children[0].innerText);
        let itemDetails = foodContent.split('\n');
        let selectedItem = element.getAttribute('id');
        window.location.href = `item/?Name=${itemDetails[0]}-id=${selectedItem}`;
    });
});

