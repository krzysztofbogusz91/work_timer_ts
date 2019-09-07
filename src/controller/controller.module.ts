import { Model } from './../model/model.module';
import { View } from './../view/view.module';

export class Controller {
  private model: Model;
  private view: View;
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.model.bindTaskListChange(this.onTaskListChange);
    this.view.bindAddTask(this.handleAddTask);
    this.view.bindDeleteTask(this.handleDeleteTask);
    this.view.bindToggleTask(this.handleToggleTask);
    this.view.bindEditTask(this.handleEditTask);

    this.onTaskListChange(this.model.getTasks());
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

}
