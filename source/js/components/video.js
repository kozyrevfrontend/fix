export default class Video
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
