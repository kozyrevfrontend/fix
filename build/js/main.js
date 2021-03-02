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

		init()
		{
			this.setActiveSlide();
			this.slidesWidth = this.slides[this.activeSlideIndex].offsetWidth;
			this.move();
			this.buttonLeft.addEventListener('click', this.moveLeft);
			this.buttonRight.addEventListener('click', this.moveRight);
		}

		setActiveSlide()
		{
			this.slides[this.activeSlideIndex].classList.add("slider__item--active", "designs__item--active");
		}

		removeActiveSlide()
		{
			this.slides[this.activeSlideIndex].classList.remove("slider__item--active", "designs__item--active");
		}

		move()
		{
			this.sliderContainer.style.transform = `translateX(-${this.slidesWidth * this.activeSlideIndex}px)`;
		}

		moveRight()
		{
			if (this.activeSlideIndex === 0)
			{
				this.buttonLeft.disabled = false;
			}

			this.removeActiveSlide();
			this.activeSlideIndex++;
			this.setActiveSlide();
			this.move();


			if (this.activeSlideIndex === this.slidesCount - 1)
			{
				this.buttonRight.disabled = true;
				return;
			}
		}

		moveLeft()
		{
			if (this.activeSlideIndex === this.slidesCount - 1)
			{
				this.buttonRight.disabled = false;
			}

			this.removeActiveSlide();
			this.activeSlideIndex--;
			this.setActiveSlide();
			this.move();

			if (this.activeSlideIndex === 0)
			{
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

		init()
		{
			this.setupVideo();
		}

		setupVideo()
		{
			this.link.removeAttribute('href');

			this.button.addEventListener('click', () =>
			{
				const iframe = this.createIframe();
				this.link.remove();
				this.button.remove();
				this.container.appendChild(iframe);
			});
		}

		createIframe()
		{
			const iframe = document.createElement('iframe');
			iframe.setAttribute('src', 'https://www.youtube.com/embed/TEBpc9Q9TV8');
			iframe.setAttribute('allowfullscreen', '');
			iframe.classList.add('video__media');

			return iframe;
		}
	}

	class Form
	{
		constructor(domNode) {
			this.form = domNode.querySelector('form');
			this.submitButton = this.form.querySelector('button[type="submit"]');

			this.submitHandler = this.submitHandler.bind(this);
		}

		init ()
		{
			this.form.addEventListener ('submit', (evt) =>
			{
				evt.preventDefault();
				this.submitHandler();
			});
		}

		submitHandler()
		{
			this.deleteChildrenElements(this.form);
			this.renderTemplate(this.form, this.successTemplate());
		}

		renderTemplate (parentElement, template, place = `beforeend`)
		{
			parentElement.insertAdjacentHTML(place, template);
		}

		deleteChildrenElements(list)
		{
			while (list.firstChild)
			{
				list.removeChild(list.firstChild);
			}
		}

		successTemplate()
		{
			return (
				`<p class="feedback__slogan"><b>Узнайте о запуске сервиса первым</b></p>
			<div class="feedback__success">
				<svg width="220" height="150">
					<use xlink:href="#icon-success"></use>
				</svg>
				<p>Спасибо! Мы будем держать вас в курсе обновлений</p>
			</div>`
			);
		}
	}

	const slider = new Slider(document.querySelector('.designs'));
	slider.init();

	const video = new Video(document.querySelector('.header__video'));
	video.init();

	const form = new Form(document.querySelector('.feedback'));
	form.init();

}());

//# sourceMappingURL=main.js.map
