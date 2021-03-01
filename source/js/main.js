import Slider from './components/slider';
import Video from "./components/video";

const slider = new Slider(document.querySelector('.designs'));
slider.init();

const video = new Video(document.querySelector('.header__video'));
video.init();
