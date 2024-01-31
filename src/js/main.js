"use strict";

console.log(import.meta.env.PROD);

// SERVER FOR IMAGES
let server = "";

if (import.meta.env.DEV) {
    server = "http://localhost:3000/";
} else {
    server = "http://localhost:4173/";
}


// SWIPER IMPORTS
import Swiper from "swiper/bundle";

import "swiper/css/bundle";

let customSwiperStyle = document.createElement("style");

customSwiperStyle.textContent = `
    .swiper {
        padding-bottom: 50px;
        padding-top: 50px;
        width: 100%;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        height: 540px;
        width: 960px;
    }

    .swiper-button-prev,
    .swiper-button-next {
        height: 70px;
        width: 64px;
        color: white;
    }

    .swiper-button-prev:after,
    .swiper-button-next:after {
        font-size: 1.75rem;
        transition: .2s ease-in-out;
    }

    .swiper-button-prev:hover.swiper-button-prev:after {
        transform: translateX(-5px);
    }

    .swiper-button-next:hover.swiper-button-next:after {
        transform: translateX(5px);
    }
`;

document.head.append(customSwiperStyle);


// MOBILE NAVIGATION
const primaryHeader = document.querySelector(".primary-header");
const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-navigation");

navToggle.addEventListener("click", () => {
    
    primaryNav.hasAttribute("data-visible")
    ?
    navToggle.setAttribute("aria-expanded", false)
    :
    navToggle.setAttribute("aria-expanded", true);

    primaryNav.toggleAttribute("data-visible");
    primaryHeader.toggleAttribute("data-overlay");
});

// GO-TO-TOP BUTTON
const toTopBtn = document.getElementById("goToTop");

window.addEventListener("scroll", function(event) {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        toTopBtn.style.display = "block";
    } else {
        toTopBtn.style.display = "none";
    }
});

toTopBtn.addEventListener("click", function(event) {
    window.history.pushState("", document.title, window.location.pathname);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


// SWIPER
const imageGalerieWrapper = document.querySelector(".swiper-wrapper");
const errorMessageDisplay = document.querySelector(".errorMessage");

const showImages = async () => {
    
    let response, data;
    let imageList = "";
    let errorMessage = "";
    
    const imageData = `${server}swiper/swiper-images.json`;

    try {
        response = await fetch(imageData);
    } catch (error) {
        if (error instanceof SyntaxError) {
            console.log("There was a syntaxerror", error);
        } else {
            console.log("There was an error", error);
        }
    }

    if (response?.ok) {
        data = await response.json();
    } else {
        console.log(`HTTP Response Code: ${response?.status}`);
    }

    if (data) {
        data.forEach((image, key) => {
            imageList += `
                <div id="${key}" aria-roledescription="3d model" class="swiper-slide" lazy="true">
                    <img loading="lazy" width="${image.images[0].width}" height="${image.images[0].height}" src="${image.images[0].url}" alt="${image.title}">
                    <div class="swiper-lazy-preloader"></div>
                </div>
            `;
        });
        
        imageGalerieWrapper.innerHTML = imageList;

        const swiper = new Swiper('.swiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
                scale: 0.9,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            initialSlide: 0,
            loop: true,
        });

        const mySwiper = document.querySelector('.swiper').swiper;

        mySwiper.init(swiper);
        mySwiper.slideNext();

    } else {

        const swiper = document.querySelector('.swiper');
        swiper.classList.add('visually-hidden');

        errorMessage += `
            <div class="text-centered">
                <h3 class="fs-500 fw-bold">Status ${response?.status}</h3>
                <p class="fs-400 fw-semi-bold">Sorry, but an error has occurred.</p>
                <p>The images of the gallery could not be found.</p>
            </div>
        `
    
        errorMessageDisplay.innerHTML = errorMessage;
    }

}

showImages();

// AGENCY
const agencyScrollWatcher = document.querySelector(".agency-card");

const observeAgency = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("slide-right", entry.isIntersecting);
        if (entry.isIntersecting) observeAgency.unobserve(entry.target);
    }, {
        rootMargin: "-100px 0px 0px 0px"
    });
});

observeAgency.observe(agencyScrollWatcher);

// CREDENTIALS
const credentialsList = document.querySelector(".credentials__wrapper");

const observeCredentials = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("slide-left", entry.isIntersecting);
        if (entry.isIntersecting) observeCredentials.unobserve(entry.target);
    }, {
        rootMargin: "-200px 0px 0px 0px"
    });
});

observeCredentials.observe(credentialsList);

// BOOKS
const booksList = document.querySelectorAll(".books-list__item");

const observeBooks = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("bounce", entry.isIntersecting);
        if (entry.isIntersecting) observeBooks.unobserve(entry.target);
    }, {
        rootMargin: "-300px 0px 0px 0px"
    });
});

booksList.forEach((book) => {
    observeBooks.observe(book);
});

// TRAINING
const trainingLists = document.querySelectorAll(".training-list__item");

const observeTraining = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle("slide-right", entry.isIntersecting);
        if (entry.isIntersecting) observeTraining.unobserve(entry.target);
    }, {
        rootMargin: "-200px 0px 0px 0px"
    });
});

trainingLists.forEach((training) => {
    observeTraining.observe(training);
});