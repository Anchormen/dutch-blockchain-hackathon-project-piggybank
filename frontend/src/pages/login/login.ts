import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
import { LoginForm, AuthService } from '../../shared/';
import { NavController, AlertController } from 'ionic-angular';
import { Dashboard } from "../dashboard/dashboard";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {
  loginData = new LoginForm('', '');
  constructor(public navCtrl: NavController, public alertController: AlertController,
    public authService: AuthService, public storage: Storage) {
    this.storage.get("id_token").then(res => {
      if(res) {
        this.navCtrl.setRoot(Dashboard);
      }
    });
      
    
  }
  
  login() {
    this
      .authService
      .login(this.loginData)
      .subscribe(res => {        
        if (!res) {
          let alert = this.alertController.create({
            title: 'Foutieve gegevens',
            subTitle: 'U kon met deze gegevens niet worden ingelogd',
            buttons: ['Okay']
          });
          alert.present();
        } else {
          this.navCtrl.setRoot(Dashboard)
        }
      });

  }
}
