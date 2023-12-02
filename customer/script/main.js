let start, end;
let listFrame = 0;
let activeFoodList = document.querySelector('.activeBtn');
foodItemContainer.addEventListener('touchstart', (e) => {
    start = e.changedTouches[0].clientX;
})
foodItemContainer.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].clientX;
    if(start > end && (start-end) > 50 && listFrame < 4) {
        foodChoice[++listFrame].click();
    }
    else {
        if(start < end && (end-start) > 50 && listFrame > 0) {
           foodChoice[--listFrame].click();
        }  
    }
})
