const slides = document.getElementsByClassName("carousel-item");
let slidePosition = 0;
let oldSlidePosition, intervalId, userInterruptedAtTimestamp;
const TOTAL_SLIDES = slides.length;

const btnNext = document.querySelector("#carousel-button-next");
btnNext.addEventListener("click", slideNext);
const btnPrev = document.querySelector("#carousel-button-prev");
btnPrev.addEventListener("click", slidePrev);

function slideNext(e){
    if(e){
        userInterruptedAtTimestamp = Date.now();
        clearAutomatedTransition();
        observe();
    }

    oldSlidePosition = slidePosition;
    if(slidePosition<TOTAL_SLIDES-1){
        slidePosition++;
    }else {
        slidePosition=0;
    }

    slides[oldSlidePosition].classList.remove('carousel-item-visible')
    slides[slidePosition].classList.add("carousel-item-visible");
}

function slidePrev(e){
    if(e){
        userInterruptedAtTimestamp = Date.now();
        clearAutomatedTransition();
        observe();
    }

    oldSlidePosition=slidePosition
    if(slidePosition>0){
        slidePosition--;
    }else {        
        slidePosition=TOTAL_SLIDES-1;        
    }

    slides[oldSlidePosition].classList.remove("carousel-item-visible");
    slides[slidePosition].classList.add("carousel-item-visible");
}

// automated slide transition
document.addEventListener("DOMContentLoaded", setupAutomatedTransition);

function setupAutomatedTransition(){
    intervalId = setInterval(slideNext, 1700);
}

function clearAutomatedTransition(){
    if(intervalId){
        clearInterval(intervalId);
        intervalId = null;
    }
}

function observe(){
    setTimeout(() => {
        const diff = Date.now() - userInterruptedAtTimestamp;
        if(diff >= 5000 && intervalId==null){
            setupAutomatedTransition();
        }
    }, 5000);
}