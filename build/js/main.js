(function () {
	'use strict';

	class Slider {
		constructor(domNode) {
			this.sliderContainer = domNode.querySelector(".slider__container");
			this.slides = this.sliderContainer.querySelectorAll(".slider__item");
			this.buttonLeft = domNode.querySelector(".slider__btn--left");
			this.buttonRight = domNode.querySelector(".slider__btn--right");
			this.slidesCount = this.slides.length;
			this.activeSlideIndex = 1;
			this.slidesWidth = null;

			this.moveLeft = this.moveLeft.bind(this);
			this.moveRight = this.moveRight.bind(this);
		}

		init() {
			this.setActiveSlide();
			this.slidesWidth = this.slides[this.activeSlideIndex].offsetWidth;
			this.move();
			this.buttonLeft.addEventListener('click', this.moveLeft);
			this.buttonRight.addEventListener('click', this.moveRight);
		}

		setActiveSlide() {
			this.slides[this.activeSlideIndex].classList.add("slider__item--active", "designs__item--active");
		}

		removeActiveSlide() {
			this.slides[this.activeSlideIndex].classList.remove("slider__item--active", "designs__item--active");
		}

		move() {
			this.sliderContainer.style.transform = `translateX(-${this.slidesWidth * this.activeSlideIndex}px)`;
		}

		moveRight() {
			if (this.activeSlideIndex === 0) {
				this.buttonLeft.disabled = false;
			}

			this.removeActiveSlide();
			this.activeSlideIndex++;
			this.setActiveSlide();
			this.move();


			if (this.activeSlideIndex === this.slidesCount - 1) {
				this.buttonRight.disabled = true;
				return;
			}
		}

		moveLeft() {
			if (this.activeSlideIndex === this.slidesCount - 1) {
				this.buttonRight.disabled = false;
			}

			this.removeActiveSlide();
			this.activeSlideIndex--;
			this.setActiveSlide();
			this.move();

			if (this.activeSlideIndex === 0) {
				this.buttonLeft.disabled = true;
			}
		}
	}

	class Video
	{
		constructor(domNode)
		{
			this.container = domNode.querySelector('.video__container');
			this.link = this.container.querySelector('.video__link');
			this.button = this.container.querySelector('.video__button');

			this.setupVideo = this.setupVideo.bind(this);
		}

		init() {
			this.setupVideo();
		}

		setupVideo() {
			this.link.removeAttribute('href');

			this.button.addEventListener('click', () => {
				const iframe = this.createIframe();
				this.link.remove();
				this.button.remove();
				this.container.appendChild(iframe);
			});
		}

		createIframe() {
			const iframe = document.createElement('iframe');
			iframe.setAttribute('src', 'https://www.youtube.com/embed/TEBpc9Q9TV8');
			iframe.setAttribute('allowfullscreen', '');
			iframe.classList.add('video__media');

			return iframe;
		}
	}

	// function findVideo() {
	// 	var video = document.querySelector('.video__container');
	//
	// 	if (video) {
	// 		setupVideo(video);
	// 	}
	// }
	//
	// function setupVideo(video) {
	// 	var link = document.querySelector('.video__link');
	//
	// 	if (link) {
	// 		link.removeAttribute('href');
	// 	}
	//
	// 	var button = document.querySelector('.video__button');
	//
	// 	if (button) {
	// 		button.addEventListener('click', function () {
	// 			var iframe = createIframe();
	// 			link.remove();
	// 			button.remove();
	// 			video.appendChild(iframe);
	// 		});
	// 	}
	//
	// 	video.classList.add('video__container--enabled');
	// }
	//
	// function createIframe() {
	// 	var iframe = document.createElement('iframe');
	// 	iframe.setAttribute('src', 'https://www.youtube.com/embed/bnzHECC0Z8A?rel=0&showinfo=0&autoplay=1');
	// 	iframe.setAttribute('allowfullscreen', '');
	// 	iframe.classList.add('video__media');
	//
	// 	return iframe;
	// }
	//
	// findVideo();

	const slider = new Slider(document.querySelector('.designs'));
	slider.init();

	const video = new Video(document.querySelector('.header__video'));
	video.init();

}());

//# sourceMappingURL=main.js.map
