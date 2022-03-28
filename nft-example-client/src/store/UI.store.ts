import { makeAutoObservable } from "mobx";

class UIStore {
  public isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public toggleIsLoading() {
    this.isLoading = !this.isLoading;
  }
}

export const uiStore = new UIStore();
