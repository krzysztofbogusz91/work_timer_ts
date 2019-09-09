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
  public onCardChanged;
  public timeCards: ITimerCard[];

  constructor() {
    this.timeCards = JSON.parse((localStorage as any).getItem('timeCards')) || this.createTimeCards();
  }

  public createTimeCards(tasks?): ITimerCard[] {
    const firstDay = moment().subtract(15, 'days');

    const timeCards = [...new Array(30)].map((el, i) => ({
      date: firstDay.clone().add(i + 1, 'day').toDate(),
      id: i + 1,
      isToday: firstDay.clone().add(i + 1, 'day').format('yyyymmdd') === moment().format('yyyymmdd'),
      tasks: [],
      time: 8 * 3600,
    }));
    return timeCards;
  }

  public addTask(cardIdTaskValue) {
    const {cardId, value} = cardIdTaskValue;
    this.timeCards = this.timeCards.map((card) => {
      if (card.id === cardId) {
        const task = {
          completed: false,
          id: card.tasks.length > 0 ? card.tasks[card.tasks.length - 1].id + 1 : 1,
          text: value,
        };
        card.tasks = [...card.tasks, task];
      }
      return card;
    });
    this._commit(this.timeCards);
  }

  public editTask(editParams) {
    const { cardId, id, text } = editParams;
    this.timeCards = this.timeCards.map((card) => {
      if (card.id === cardId) {
        card.tasks = card.tasks.map((task) => task.id === id ? { ...task, text } : task);
      }
      return card;
    });
    this._commit(this.timeCards);
  }

  public deleteTask(id) {
    const {cardId, taskId} = id;
    this.timeCards = this.timeCards.map((card) => {
      if (card.id === cardId) {
        card.tasks = card.tasks.filter((task) => task.id !== taskId);
      }
      return card;
    });
    this._commit(this.timeCards);
  }

  public toggleTask(cardIdTaskId) {
    const {cardId, id} = cardIdTaskId;

    this.timeCards = this.timeCards.map((card) => {
      if (card.id === cardId) {
        card.tasks = card.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task);
      }
      return card;
    });
    this._commit(this.timeCards);
  }

  public getCards() {
    return this.timeCards;
  }

  public bindCardListChange(callback) {
    this.onCardChanged = callback;
  }

  private _commit(cards) {
    localStorage.setItem('timeCards', JSON.stringify(cards));
    this.onCardChanged(cards);
  }
}
