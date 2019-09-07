export class View {
  private app: any;
  private title: any;
  private form: any;
  private input: any;
  private submitButton: any;
  private list: any;
  private temporaryTaskText: any;

  constructor() {
    this.app = this.getElem('#root');

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

    this.app.append(this.title, this.form, this.list);

    this._initLocalListeners();
  }

  public crateElem(tag: string, className?: string): any {
    const elem: any = document.createElement(tag);
    if (className) elem.classList.add(className);

    return elem;
  }

  public getElem(selector: string): any {
    const elem = document.querySelector(selector);
    return elem;
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
      tasksList.forEach((task) => {
        const li = this.crateElem('li');

        li.id = task.id;
        const check = this.crateElem('input');
        check.type = 'checkbox';
        check.checked = task.completed;

        const span = this.crateElem('span');
        span.contentEditable = true;
        span.classList.add('editable');

        if (task.complete) {
          const strike = this.crateElem('s');
          strike.textContent = task.text;
          span.append(strike);
        } else {
          span.textContent = task.text;
        }

        const deleteButton = this.crateElem('button', 'delete');
        deleteButton.textContent = 'Delete';
        li.append(check, span, deleteButton);

        this.list.append(li);
      });
    }
  }

 public bindAddTask(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (this._taskText) {
        handler(this._taskText);
        this._resetTaskInput();
      }
    });
  }

  public bindDeleteTask(handler) {
    this.list.addEventListener('click', (event) => {
      if (event.target.className === 'delete') {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
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
        const id = parseInt(event.target.parentElement.id, 2);

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
