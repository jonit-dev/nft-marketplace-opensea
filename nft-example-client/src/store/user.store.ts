import { makeAutoObservable } from "mobx";
import { IUser } from "../types/user.types";

class UserStore {
  public user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public setUser(user: IUser) {
    this.user = user;
  }
}

export const userStore = new UserStore();
