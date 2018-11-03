import { createComponet } from './modules/app.componet';
import './styles/styles.scss';

// Import all project files to compile
// TODO ADD FAVICON AND ASSETS TO WEBPACK
document.addEventListener('DOMContentLoaded', () => {
  createComponet().innerHTML = 'Hello TypeScript!';
});
