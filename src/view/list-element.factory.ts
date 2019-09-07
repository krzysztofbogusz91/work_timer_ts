import { Element } from 'view/element.factory';

export class ListElement extends Element {
 private listElement: any;

 constructor() {
     super();
 }

 public createListElement() {
    const li = this.crateElement('li', 'task-li-elem');
 }
}
