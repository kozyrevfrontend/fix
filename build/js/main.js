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

	const slider = new Slider(document.querySelector('.designs'));
	slider.init();

}());

//# sourceMappingURL=main.js.map
