import './style.css';
import { Assets } from './Assets.js';
import { Engine } from './engine/Engine.js';
import { Title } from './game/scenes/Title.js';

const canvas = document.querySelector("#game") as HTMLCanvasElement;
const engine = new Engine(canvas);
await Assets.load();
engine.start(Title);