import { Controller } from './controller/controller.module';
import { Model } from './model/model.module';
import './styles/styles.scss';
import { View } from './view/view.module';

const app: any = new Controller(new Model(), new View());
