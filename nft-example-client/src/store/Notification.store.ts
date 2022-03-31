import { makeAutoObservable } from "mobx";
import { NotificationType } from "../components/Notification";

interface INotification {
  type: NotificationType;
  message: string;
  isOpen: boolean;
}

class NotificationStore {
  public notification: INotification | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public showNotification(
    type: NotificationType = "is-primary",
    message: string,
    autoCancel: boolean = true
  ) {
    this.notification = {
      type,
      message,
      isOpen: true,
    };

    if (autoCancel) {
      setTimeout(() => {
        this.clearNotification();
      }, 6000);
    }
  }

  public clearNotification() {
    this.notification = null;
  }
}

export const notificationStore = new NotificationStore();
