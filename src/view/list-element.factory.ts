import { Element } from './element.factory';

export class ListElement extends Element {
 private listElement: any;

 constructor() {
     super();
 }

 public createListElement() {
    const li = this.crateElement('li', 'task-li-elem');
    return li;
}

 public createListElements(tasks, parentElement) {
    tasks.forEach((task) => {
        const li = this.createListElement();

        li.id = task.id;
        const check = this.crateElement('input');
        check.type = 'checkbox';
        check.checked = task.completed;

        const span = this.crateElement('span');
        span.contentEditable = true;
        span.classList.add('editable');

        if (task.completed) {
          const strike = this.crateElement('s');
          strike.textContent = task.text;
          span.append(strike);
        } else {
          span.textContent = task.text;
        }

        const deleteButton = this.crateElement('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(check, span, deleteButton);

        parentElement.append(li);
      });
 }
}
