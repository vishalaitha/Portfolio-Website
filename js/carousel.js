console.log('test');

const track = document.querySelector('.carousel__track');

const slides = Array.from(track.children);

const nextButton = document.querySelector('.carousel__button--right');

const prevButton = document.querySelector('.carousel__button--left');

const dotsNav = 
document.querySelector('.carousel__nav');

const dots= Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// slides[0].style.left=slideWidth*0+'px';
// slides[1].style.left=slideWidth*1+'px';
// slides[2].style.left=slideWidth*2+'px';

const setSlidePosition=(slide,index)=>{
    slide.style.left=slideWidth*index+'px';
}
slides.forEach(setSlidePosition);

const moveToSlide = (track,currentSlide,targetSlide)=>{

    track.style.transform = 'translateX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

}

const updateDots=(currentDot,targetDot)=>{
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
    
}

const hideShowArrows = (slides,prevButton,nextButton,targetIndex)=>{
    if(targetIndex===0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if(targetIndex===slides.length-1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// console.log(slideSize);

// console.log(slides);

// When I click left, move slides to the left

nextButton.addEventListener('click',e=>{
    
    const currentSlide=track.querySelector('.current-slide');
    const nextSlide=currentSlide.nextElementSibling;
    // move to the next slide
    moveToSlide(track,currentSlide,nextSlide);
    const currentDot=dotsNav.querySelector('.current-slide');
    const nextDot=currentDot.nextElementSibling;
    const nextIndex=slides.findIndex(slide=>slide==nextSlide);
    hideShowArrows(slides,prevButton,nextButton,nextIndex);
    updateDots(currentDot,nextDot);
})

// When I click right, move slides to the right

prevButton.addEventListener('click',e=>{
    
    const currentSlide=track.querySelector('.current-slide');
    const prevSlide=currentSlide.previousElementSibling;
    // move to the next slide
    const currentDot=dotsNav.querySelector('.current-slide');
    const prevDot=currentDot.previousElementSibling;
    const prevIndex=slides.findIndex(slide=>slide===prevSlide);

    updateDots(currentDot,prevDot);
    hideShowArrows(slides,prevButton,nextButton,prevIndex);
    moveToSlide(track,currentSlide,prevSlide);
    
})

dotsNav.addEventListener('click',e=>{
    // what indicator did I clicked on 
    const targetDot = e.target.closest('button');
     if(!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide=slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide);
    updateDots(currentDot,targetDot);

    hideShowArrows(slides,prevButton,nextButton,targetIndex);
    // console.log(targetIndex);
    
})

// When I click the nav indicators, move to that slide

