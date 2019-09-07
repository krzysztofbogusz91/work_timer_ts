import * as moment from 'moment';
interface ITimerCard {
  id: number;
  date: any;
  time: number;
  isToday: boolean;
  tasks: any[];
}
export class Model {
  public onTasksChanged;
  private timeCards: ITimerCard[];
  private tasks: any[];
  constructor() {
    this.tasks = JSON.parse((localStorage as any).getItem('todos')) || [];
    this.createTimeCards();
    }
  public createTimeCards(): ITimerCard[] {
    const today = moment().toDate();

    const firstDay = moment().subtract(15, 'days');

    const timeCards = [...new Array(30)].map((el, i) => ({
      date: firstDay.clone().add(i + 1, 'day').toDate(),
      id: i + 1,
      isToday: false,
      tasks: this.tasks,
      time: 8 * 3600,
    }));
    console.log(timeCards);
    return timeCards;
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
