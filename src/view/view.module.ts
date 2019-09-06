export class View {
  private app: any;
  private title: Element;
  private form: any;
  private input: any;
  private submitButton: Element;
  private list: Element;

  constructor() {
    this.app = this.getElem('#root');

    this.title = this.crateElem('h1');
    this.title.textContent = 'Tasks';

    this.form = this.crateElem('form');
    this.input = this.crateElem('input');
    this.input.type = 'text';
    this.input.placehodler = 'Add task';
    this.input.name = 'task';

    this.submitButton = this.crateElem('button');
    this.submitButton.textContent = 'Add task';

    this.list = this.crateElem('ul', 'task-list');

    this.form.append(this.input, this.submitButton);

    this.app.append(this.title, this.form, this.list);
  }

  public crateElem(tag: string, className?: string): Element {
    const elem: Element = document.createElement(tag);
    if (className) elem.classList.add(className);

    return elem;
  }

  public getElem(selector: string): Element {
    const elem = document.querySelector(selector);
    return elem;
  }
}
