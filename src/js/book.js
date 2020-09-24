const book = document.getElementById('book');
//***********Range*********** */
const range = {
    wrapper: document.querySelector(".range"),
    bg: document.querySelector(".range__bg"),
    slider: document.querySelector(".range__slider"),
    progress: document.querySelector(".range__progress"),
    min: 16
};
const rightEdge = range.bg.offsetWidth - range.slider.offsetWidth / 2;
const sliderWidth = range.slider.offsetWidth / 2
function rangeChange(newLeft) {
    let newFontSize;
    if (newLeft < 0) {
        newLeft = 0;
        newFontSize = range.min
    } else if (newLeft > rightEdge) {
        newLeft = rightEdge;
    } else {
        newLeft = Math.floor(newLeft / 10) * 10
    }

    range.slider.style.left = `${newLeft}px`;
    range.progress.style.width = `${newLeft + sliderWidth}px`;
    newFontSize = newLeft / 10 + range.min
    book.style.fontSize = `${newFontSize}px`;
}

/****** click ***** */
range.wrapper.onclick = e => {
    if (e.target === range.slider) return;
    let newLeft = e.offsetX - sliderWidth;
    rangeChange(newLeft)
};
/******* mouse ****** */
range.slider.onmousedown = e => {
    e.preventDefault();
    let shiftX = e.clientX - range.slider.getBoundingClientRect().left;
    const onMouseUp = () => {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseDrag);
    };
    const onMouseDrag = e => {
        let newLeft = e.clientX - shiftX - range.bg.getBoundingClientRect().left + sliderWidth;
        rangeChange(newLeft)
    };
    document.addEventListener("mousemove", onMouseDrag);
    document.addEventListener("mouseup", onMouseUp);
};
/******* touch ****** */
range.slider.addEventListener('touchstart', e => {

    let shiftX = e.changedTouches[0].clientX - range.slider.getBoundingClientRect().left;
    const onMouseUp = () => {
        range.slider.removeEventListener("touchend", onMouseUp, false);
        range.slider.removeEventListener("touchmove", onMouseDrag, false);
    };
    const onMouseDrag = e => {
        let newLeft = e.changedTouches[0].clientX - shiftX - range.bg.getBoundingClientRect().left + sliderWidth;
        rangeChange(newLeft)
    };
    range.slider.addEventListener("touchmove", onMouseDrag);
    range.slider.addEventListener("touchend", onMouseUp);

}, false);


/****** backgrount change*********/
let radiosBg = document.getElementsByClassName('bigradio__input');
let prev = null;
for (radioBg of radiosBg) {
    radioBg.addEventListener('change', function () {
        document.querySelector('.bigradio__item_active').classList.remove('bigradio__item_active')
        this.closest('.bigradio__item').classList.add('bigradio__item_active');
        (prev) ? book.classList.remove(prev) : null;
        if (this !== prev) {
            prev = this.value;
        }
        book.classList.add(this.value)
    });
}

new Glide('.banner', {
    type: 'carousel',
    startAt: 0,
    perView: 3,
    animationDuration: 8000,
    animationTimingFunc: 'linear',
    autoplay: 1,
    gap: 0
}).mount()
