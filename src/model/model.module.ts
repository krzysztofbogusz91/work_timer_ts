
export class Model {
  public onTasksChanged;
  private tasks: any[];
  constructor() {
    this.tasks = JSON.parse((localStorage as any).getItem('todos')) || [];
    }

  public addTask(taskText) {
    const task = {
      completed: false,
      id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
      text: taskText,
    };
    this.tasks = [...this.tasks, task];

    this._commit(this.tasks);
  }

  public editTask(id, updatedText) {
    this.tasks = this.tasks.map((task) => task.id === id ? { ...task, text: updatedText } : task);
    this._commit(this.tasks);
    }

  public deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.onTasksChanged(this.tasks);
    this._commit(this.tasks);
  }

  public toggleTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task);
    this._commit(this.tasks);
  }

  public getTasks() {
    return this.tasks;
  }
  public bindTaskListChange(callback) {
    this.onTasksChanged = callback;
  }

  private _commit(tasks) {
    this.onTasksChanged(tasks);
    localStorage.setItem('todos', JSON.stringify(tasks));
  }
}
