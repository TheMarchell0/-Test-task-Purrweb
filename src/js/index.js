import "./import/modules";

function slidersInit() {
    const sliderOptions = {
        mainSlider: {
            speed: 1000,
            slidesPerView: 1,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
            },
        },
    };
    let sliders = document.querySelectorAll(".js-slider");
    if (sliders.length > 0) {
        sliders.forEach((slider) => {
            if (slider.classList.contains("js-slider--main")) {
                let swiper = new Swiper(slider, sliderOptions.mainSlider);
            }
        });
    }
}

function showHeaderScroll() {
    let scrollHeader = document.getElementById("js-header");
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        let scrollCount = window.scrollY;
        if (scrollCount > 0) {
            scrollHeader.classList.add("header_colored");
        } else {
            scrollHeader.classList.remove("header_colored");
        }
    };
    document.addEventListener("DOMContentLoaded", function() {
        if (window.scrollY > 0) {
            scrollHeader.classList.add("header_colored");
        }
    });
}

function anchor() {
    const anchors = document.querySelectorAll("a.js-anchor");

    for (let anchor of anchors) {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            const blockID = anchor.getAttribute("href");

            document.querySelector(blockID).scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        });
    }
}

function initYoutubeVideo() {
    const links = document.querySelectorAll('.js-video-init');
    if (links.length > 0) {
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                let parent = link.closest('.js-youtube-parent');
                parent.classList.add('video-no-play-button');
                let youtubeElem = document.createElement('div');
                let linkVideo = link.dataset.linkVideo;
                parent.style.minHeight = 'auto';
                parent.innerHTML = '';
                parent.appendChild(youtubeElem);
                onYouTubeIframeAPIReady(youtubeElem, linkVideo);

            });
        });
    }

    // Создание iframe ютуба
    function onYouTubeIframeAPIReady(elem, link) {
        let video = new YT.Player(elem, {
            height: '100%',
            width: '100%',
            videoId: youtubeParser(link),
            events: {
                'onReady': onPlayerReady,
            }
        });
    }
    // Запуск видоса из ютуба
    function onPlayerReady(event) {
        event.target.playVideo();
    }
    // получение id видоса из полной ссылки на ютуб
    function youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : false;
    }

}

function headerBurgetInit() {
    let trigger = document.querySelector("#js-header-burger");
    let menu = document.querySelector("#header-mobile-menu");

    trigger.addEventListener("click", function() {
        menu.classList.toggle("header__mobile-menu_active");
        trigger.classList.toggle("header__burger_active");
        document.body.style.overflow = "hidden";
        if (menu.classList.contains("header__mobile-menu_active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    });

    document.addEventListener(`keyup`, (e) => {
        if (e.keyCode === 27) {
            menu.classList.remove("header__mobile-menu_active");
            trigger.classList.remove("header__burger_active");
            document.body.style.overflow = "";
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    slidersInit();
    showHeaderScroll();
    anchor();
    initYoutubeVideo();
    headerBurgetInit()
});