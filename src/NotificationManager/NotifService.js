import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;

    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function(number) {
      if(number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  localNotif(title, message) {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      /* iOS and Android properties */
      title: title, // (optional)
      message: message, // (required)
      actions: '["Yes", "No"]', // (Android only)
    });
  }

  scheduleNotif(soundName) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 30 * 1000), // in 30 secs
      /* Android Only Properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      /* iOS and Android properties */
      title: 'Local Notification', // (optional)
      message: 'My Notification Message', // (required)
      actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: '' + this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }
}