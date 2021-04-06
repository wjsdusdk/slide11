var slides = document.querySelector(".slides"),
    slide = document.querySelectorAll(".slides li"),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = 200,
    slideMargin = 30,
    prevBtn = document.querySelector(".prev"),
    nextBtn = document.querySelector(".next");

makeClone();

function makeClone() {
    for (var i = 0; i < slideCount; i++) {
        // a.cloneNode() : a 요소 복사
        // a.cloneNode(true) : a의 자식 요소까지 복사
        var cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        // a.appendChild(b) : a 안에 기존의 내용 뒤에 b를 추가
        slides.appendChild(cloneSlide);
    }

    for (var i = slideCount - 1; i >= 0; i--) {
        var cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add("clone");
        // a.prepend(b) : a 안에 기존의 내용 앞에 b를 추가
        slides.prepend(cloneSlide);
    }

    updateWidth();
    setInitialPos();

    // slides.classList.add('animated'); // 문제 : 처음에 로드될 때 transition이 보임
    setTimeout(function () {
        slides.classList.add("animated");
    }, 100); // 시간이 지나고 실행 // 해결
}

function updateWidth() {
    var currentSlides = document.querySelectorAll(".slides li");
    var newSlideCount = currentSlides.length;
    var newWidth = (slideWidth + slideMargin) * newSlideCount - slideMargin + "px";
    slides.style.width = newWidth;
}

function setInitialPos() {
    var initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    slides.style.transform = "translateX(" + initialTranslateValue + "px)";
}

nextBtn.addEventListener("click", function () {
    moveSlide(currentIdx + 1);
});

prevBtn.addEventListener("click", function () {
    moveSlide(currentIdx - 1);
});

function moveSlide(num) {
    slides.style.left = -num * (slideWidth + slideMargin) + "px";
    currentIdx = num;
    console.log(currentIdx, slideCount);

    if (currentIdx == slideCount || currentIdx == -slideCount) {
        // 문제 2. 문제 1 해결을 위해 클래스 제거했지만 마지막 페이지에서 처음 페이지로 갈 때 transition이 안보임
        // slides.classList.remove('animated');

        // 문제 1. 마지막 페이지에서 처음 페이지로 갈 때 transition이 보임
        // slides.style.left = '0px';
        // currentIdx = 0;

        setTimeout(function () {
            slides.classList.remove("animated");
            slides.style.left = "0px";
            currentIdx = 0;
        }, 500); // 문제 3. 문제 2 해결을 위해 setTimeout으로 처리했지만 transition이 사라짐
        setTimeout(function () {
            slides.classList.add("animated");
        }, 600); // 해결
    }
}

// 자동 슬라이드

var timer = undefined;

function autoSlide() {
    if (timer == undefined) {
        timer = setInterval(function () {
            moveSlide(currentIdx + 1);
        }, 2000);
    }
}
autoSlide();

function stopSlide() {
    clearInterval(timer);

    // stopSlide 후 다시 autoSlide할 때 timer의 값이 undefined이 아니라 숫자로 바껴있음
    console.log(timer); // 2
    timer = undefined;
    console.log(timer); // undefined
}

slides.addEventListener('mouseenter', function() {
    stopSlide();
})

slides.addEventListener('mouseleave', function() {
    autoSlide();
})