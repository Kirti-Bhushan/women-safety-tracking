import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Shake } from '@awesome-cordova-plugins/shake/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage {
  constructor(
    private router: Router,
    private shake: Shake,
    private platform: Platform,
    private alertCtrl: AlertController
  ) {
    this.initializeShakeDetection();
  }

  // Navigate to Login Page
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Trigger SOS Alert
  async triggerSOS() {
    const alert = await this.alertCtrl.create({
      header: 'SOS Alert!',
      message: 'Emergency alert triggered!',
      buttons: ['OK']
    });
    await alert.present();
    console.log('SOS Alert Sent');
  }

  // Initialize Shake Detection for SOS
  initializeShakeDetection() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.shake.startWatch(60).subscribe(() => {
          this.triggerSOS();
        });
      }
    });
  }
}
