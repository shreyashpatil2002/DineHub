let start, end, startY, endY;
let listFrame = 0;
let frameWidth = 0;
const foodContainer = document.getElementById('food-Items');
let activeFoodList = document.querySelector('.activeBtn');
document.querySelector('.main-container').addEventListener('touchstart', (e) => {
    start = e.changedTouches[0].clientX;
    startY = e.changedTouches[0].clientY;
})
document.querySelector('.main-container').addEventListener('touchend', (e) => {
    end = e.changedTouches[0].clientX;
    endY = e.changedTouches[0].clientY;
    if (start > end && (start - end) > 50 && listFrame < 4 && (startY - endY) < 50 && (startY - endY) > -100) {
        frameWidth += 20.10;
        Goforword(frameWidth);
        listFrame++;
    }
    else {
        if (start < end && (end - start) > 50 && listFrame > 0 && (startY - endY) < 50 && (startY - endY) > -100) {
            frameWidth -= 20.10;
            Gobackword(frameWidth);
            listFrame--;
        }
    }
    removeActiveBtn();
    addActiveBtn(listFrame);
    if(listFrame == 1 || listFrame == 3) {
        foodContainer.style.transform += 'translateY(0px);'
    }
    if(listFrame > 2) {
        document.querySelector('#categories').scrollTo(300, 0);
    }
    if(listFrame < 3) {
        document.querySelector('#categories').scrollTo(0, 0);
    }
})

const Goforword = (framesize) => {
    foodContainer.style.transform = `translateX(-${framesize}%)`;
}
const Gobackword = (framesize) => {
    foodContainer.style.transform = `translateX(-${framesize}%)`;
}