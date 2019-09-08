import { Controller } from './controller/controller.module';
import { Model } from './model/model.module';
import './styles/styles.scss';
import { View } from './view/view.module';

const app: any = new Controller(new Model(), new View());

// document.querySelectorAll('.delete').forEach((el) => {
//   console.log(el);
//   el.addEventListener('click', (event) => {
//     console.log('event');
//     console.log(event);
//     // const id = parseInt(event.target.parentElement.id);
//     // console.log('delete', id);
//     // handler(id);
//   });
// });
