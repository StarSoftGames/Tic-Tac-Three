import './style.css';
import { Assets } from './Assets.js';
import { Engine } from './engine/Engine.js';
import { Title } from './game/scenes/Title.js';

const canvas = document.getElementById("game") as HTMLCanvasElement;
const loadingScreen = document.getElementById("loading_screen") as HTMLImageElement;
await Assets.load();
loadingScreen.style.display = "none";
canvas.style.display = "inline";
const engine = new Engine(canvas);
engine.start(Title);