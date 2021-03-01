export default class Video
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
