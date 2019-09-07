export class Element {
 constructor() {
 }

 public crateElement(tag, className?) {
    const elem: any = document.createElement(tag);
    if (className) elem.classList.add(className);
    return elem;
 }
}
