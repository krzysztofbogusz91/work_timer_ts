import { Element } from './element.factory';
import { ListElement } from './list-element.factory';

export class View {
  public factory;
  public listFactory;
  public crateElem;
  private app: any;
  private cardsContainer: any;
  private title: any;
  private form: any;
  private input: any;
  private submitButton: any;
  private list: any;
  private temporaryTaskText: any;

  constructor(factory = new Element(), listFactory = new ListElement()) {
    this.factory = factory;
    this.listFactory = listFactory;
    this.crateElem = this.factory.crateElement;

    this.app = this.getElem('#root');

    this.cardsContainer = this.factory.crateElement('ul', 'cards-container');

    this.title = this.crateElem('h1');
    this.title.textContent = 'Tasks';

    this.form = this.crateElem('form');
    this.input = this.crateElem('input');
    this.input.type = 'text';
    this.input.placeholder = 'Add task';
    this.input.name = 'task';

    this.submitButton = this.crateElem('button');
    this.submitButton.textContent = 'Add task';

    this.list = this.crateElem('ul', 'task-list');

    this.form.append(this.input, this.submitButton);

    this.app.append(this.cardsContainer);

    this._initLocalListeners();
  }

  public getElem(selector: string): any {
    const elem = document.querySelector(selector);
    return elem;
  }

  public displayCards(cardList) {
    console.log('dis cards');
    while (this.cardsContainer.firstChild) {
      this.cardsContainer.removeChild(this.cardsContainer.firstChild);
    }
    console.log(cardList);
    cardList.forEach((card) => {
      const li = this.factory.crateElement('li');
      li.innerText = card.date;
      li.id = card.id;
      const input = this.factory.crateElement('input');
      li.append(input);
      const ul = this.factory.crateElement('ul');
      this.listFactory.createListElements(card.tasks, ul);
      li.append(ul);
      this.cardsContainer.append(li);
    });
  }

  public displayTasks(tasksList: any[]) {
    while (this.list.firstChild) {
      this.list.removeChild(this.list.firstChild);
    }

    if (tasksList.length === 0) {
      const p = this.crateElem('p');
      p.textContent = 'Nothing to do ;)';
      this.list.append(p);
    } else {
      this.listFactory.createListElements(tasksList, this.list);
    }
  }

 public bindAddTask(handler) {
  const cards = this.cardsContainer.childNodes;
  this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._taskText) {
        handler(this._taskText);
        this._resetTaskInput();
      }
    });
  }

  public bindDeleteTask(handler) {
    const cards = this.cardsContainer.childNodes;

    cards.forEach((card) => {
      card.lastChild.addEventListener('click', (event) => {
        if (event.target.className === 'delete') {
          console.log('add ev list');
          const cardId = parseInt(event.target.parentElement.parentElement.parentElement.id);
          const taskId = parseInt(event.target.parentElement.id);
          handler({cardId, taskId});
        }
      });
    });
  }

  public bindToggleTask(handler) {
    this.list.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const id = parseInt(event.target.parentElement.id);
        handler(id);
      }
    });
  }

  public _initLocalListeners() {
    this.list.addEventListener('input', (event) => {
      if (event.target.className === 'editable') {
        this.temporaryTaskText = event.target.innerText;
      }
    });
  }

  public bindEditTask(handler) {
    this.list.addEventListener('focusout', (event) => {
      if (this.temporaryTaskText) {
        const id = parseInt(event.target.parentElement.id);

        handler(id, this.temporaryTaskText);
        this.temporaryTaskText = '';
      }
    });
  }

  private get _taskText() {
    return this.input.value;
  }

  private _resetTaskInput() {
    this.input.value = '';
  }
}
