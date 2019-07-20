import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    //When the app's open, we'll show them as Toasts, but feel free to use an Alert instead
    public toastCtrl: ToastController,
    private firebase: Firebase
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      try{
        this.initializeFirebase();
      } catch (error) {
        this.firebase.logError(error);
      }
    });
  }

    initializeFirebase() {
        //if(!this.platform.is("core")) {}
          this.firebase.subscribe("all");
          this.platform.is('android') ? this.initializeFirebaseAndroid() : this.initializeFirebaseIOS();
        
      }
    initializeFirebaseAndroid() {
        this.firebase.getToken().then(token => {
          console.log(token)
        });
        this.firebase.onTokenRefresh().subscribe(token => {
          console.log(token)
        })
        this.subscribeToPushNotifications();
      }
    initializeFirebaseIOS() {
        this.firebase.grantPermission()
        .then(() => {
          this.firebase.getToken().then(token => {
            console.log(token)
          });
          this.firebase.onTokenRefresh().subscribe(token => {
            console.log(token)
          })
          this.subscribeToPushNotifications();
        })
        .catch((error) => {
          this.firebase.logError(error);
        });
      }

    subscribeToPushNotifications() {
        this.firebase.onNotificationOpen().subscribe(async (response) => {
          if(response.tap){
            //Received while app in background (this should be the callback when a system notification is tapped)
            //This is empty for our app since we just needed the notification to open the app
          }else{
            //received while app in foreground (show a toast)
            let toast =  await this.toastCtrl.create({
              message: response.body,
              duration: 3000
            });
            toast.present();
          }
        });
      }
}
