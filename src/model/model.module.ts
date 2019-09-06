export class Model {
  private tasks: any[];
  constructor() {
    this.tasks = [
      {
        completed: false,
        id: 0,
        text: 'my tax task',
      },
    ];
  }

  public addTask(taskText) {
    const task = {
      completed: false,
      id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
      text: taskText,
    };

    this.tasks = [task, ...this.tasks];
  }

  public editTask(id, updatedText) {
    this.tasks = this.tasks.map( (task) => task.id === id ?
       {...task, text: updatedText } :
       task);
  }

  public deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  public toggleTask(id) {
    this.tasks = this.tasks.map((task) => task.id === id ?
       {...task, completed: !task.completed } :
        task);
  }

  public getTasks() {
    return this.tasks;
  }

}
