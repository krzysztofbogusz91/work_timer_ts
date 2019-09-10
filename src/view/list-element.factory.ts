import { Element } from './element.factory';

export class ListElement extends Element {
 private listElement: any;

 constructor() {
     super();
 }

 public createListElement() {
    const li = this.crateElement('li', 'task-list-element');
    return li;
}

 public createListElements(tasks, parentElement) {
    tasks.forEach((task) => {
        const li = this.createListElement();

        li.id = task.id;

        const check = this.crateElement('input', 'regular-checkbox');
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

        this.generateFlexView(li, check, span, deleteButton);

        parentElement.append(li);
      });

    }
 private generateFlexView(parent, ...args) {
      const divCreator = (cssClass = '') => this.crateElement('div', cssClass);
      const argumentsList = [...Array.from(arguments).splice(1, arguments.length)];
      const flexParent = divCreator('flex-container');
      argumentsList.forEach((elem) => {
        const elemContainer = divCreator('flex-elem');
        elemContainer.append(elem);
        flexParent.append(elemContainer);
      });
      parent.append(flexParent);
    }
}
