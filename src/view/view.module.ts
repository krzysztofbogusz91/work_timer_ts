import * as moment from 'moment';
import { Element } from './element.factory';
import { ListElement } from './list-element.factory';

export class View {
  public factory;
  public listFactory;
  public crateElem;
  private app: any;
  private cardsContainer: any;
  private temporaryTaskText: any;

  constructor(factory = new Element(), listFactory = new ListElement()) {
    this.factory = factory;
    this.listFactory = listFactory;
    this.crateElem = this.factory.crateElement;

    this.app = this.getElem('#root');

    this.cardsContainer = this.factory.crateElement('ul', 'cards-container');

    this.app.append(this.cardsContainer);

    this._initLocalListeners();
  }

  public getElem(selector: string): any {
    const elem = document.querySelector(selector);
    return elem;
  }

  public displayCards(cardList) {
    while (this.cardsContainer.firstChild) {
      this.cardsContainer.removeChild(this.cardsContainer.firstChild);
    }
    cardList.forEach((card) => {
      const li = this.factory.crateElement('li', 'cards-container-element');
      li.id = card.id;

      const dateHeader = this.factory.crateElement('h3', 'date-header');
      dateHeader.innerText = moment(card.date).format('L');
      let header;
      if (card.isToday) {
        header = this.crateElem('div', 'timer-header-container');
        const headerInput = this.factory.crateElement('input', 'start-time-input');
        li.id = 'active-day';
        headerInput.value = '08:00';
        headerInput.placeholder = 'set timer';
        const startButton = this.crateElem('button', 'start-button');
        startButton.innerText = '>';
        const stopButton = this.crateElem('button', 'stop-button');
        stopButton.innerText = '||';

        this.listFactory.generateFlexView(header, headerInput, startButton, stopButton);
      } else {
        header = this.factory.crateElement('h2', 'card-header');
        header.innerText = card.time;
      }

      const form = this.crateElem('form');

      const input = this.factory.crateElement('input', 'add-task-input');
      input.classList.add('input-' + card.id);

      const submitButton = this.crateElem('button');
      submitButton.textContent = 'Add task';

      const formContainer = this.crateElem('div', 'add-form-container');
      formContainer.append(input, submitButton);

      form.append(dateHeader, header, formContainer);

      li.append(form);

      const ul = this.factory.crateElement('ul', 'task-list');

      if (card.tasks.length === 0) {
        const p = this.crateElem('p', 'nothing-msg');
        p.innerText = 'Nothing to do!';
        ul.append(p);
      } else {
        this.listFactory.createListElements(card.tasks, ul);
      }

      li.append(ul);

      this.cardsContainer.append(li);

    });
  }

 public bindAddTask(handler) {
  this.cardsContainer.addEventListener('submit', (event) => {
      event.preventDefault();
      const cardId = parseInt(event.target.parentElement.id);
      const value = (document.querySelector(`.input-${cardId}`) as any).value;
      if (!!value) {
        this._resetTaskInput(cardId);
        handler({cardId, value});
      }
    });
  }

  public bindDeleteTask(handler) {
    this.cardsContainer.addEventListener('click', (event) => {
      if (event.target.className === 'delete') {
        const cardId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
        const taskId = parseInt(event.target.parentElement.parentElement.parentElement.id);
        handler({cardId, taskId});
      }
    });
  }

  public bindToggleTask(handler) {
    this.cardsContainer.addEventListener('change', (event) => {
      if (event.target.type === 'checkbox') {
        const cardId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
        const id = parseInt(event.target.parentElement.parentElement.parentElement.id);
        handler({cardId, id});
      }
    });
  }

  public _initLocalListeners() {
   this.cardsContainer.addEventListener('input', (event) => {
      if (event.target.className === 'editable') {
        this.temporaryTaskText = event.target.innerText;
      }
    });
  }

  public bindEditTask(handler) {
    this.cardsContainer.addEventListener('focusout', (event) => {
      if (this.temporaryTaskText) {
        const id = parseInt(event.target.parentElement.id);
        const cardId = parseInt(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.id);
        handler({cardId, id, text: this.temporaryTaskText});
        this.temporaryTaskText = '';
      }
    });
  }
  public initDisplayPosition() {
    setTimeout(() => {
      document.getElementById('active-day').scrollIntoView({behavior: 'smooth',
      block: 'center' , inline: 'center',
    });

    }, 500);
  }
  private _resetTaskInput(cardId) {
    (document.querySelector(`.input-${cardId}`) as any).value = '';
  }
}
