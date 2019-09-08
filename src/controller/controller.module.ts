import { Model } from './../model/model.module';
import { View } from './../view/view.module';

export class Controller {
  private model: Model;
  private view: View;
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.onCardListChange(this.model.createTimeCards());

    this.model.bindTaskListChange(this.onTaskListChange);
    this.view.bindAddTask(this.handleAddTask);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTask(this.handleToggleTask);
    this.view.bindEditTask(this.handleEditTask);

    // this.onTaskListChange(this.model.getTasks());
    this.onCardListChange(this.model.createTimeCards());
  }

  public handleAddTask = (task) => {
    this.model.addTask(task);
  }

  public handleEditTask = (id, task) => {
    this.model.editTask(id, task);
  }

  public handleDeleteTask = (id) => {
    this.model.deleteTask(id);
  }

  public handleToggleTask = (id) => {
    this.model.toggleTask(id);
  }

  public onTaskListChange = (tasks) => {
    this.view.displayTasks(tasks);
  }

  public onCardListChange = (cards) => {
    this.view.displayCards(cards);
  }

}
