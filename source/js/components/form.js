export default class Form
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

	submitHandler ()
	{
		this.deleteChildrenElements(this.form);
		this.renderTemplate(this.form, this.successTemplate());
	}

	renderTemplate (parentElement, template, place = `beforeend`)
	{
		parentElement.insertAdjacentHTML(place, template);
	}

	deleteChildrenElements (list)
	{
		while (list.firstChild)
		{
			list.removeChild(list.firstChild);
		}
	}

	successTemplate ()
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
