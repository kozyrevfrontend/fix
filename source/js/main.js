import Slider from './components/slider';
import Video from "./components/video";
import Form from "./components/form";

const slider = new Slider(document.querySelector('.designs'));
slider.init();

const video = new Video(document.querySelector('.header__video'));
video.init();

const form = new Form(document.querySelector('.feedback'));
form.init();
