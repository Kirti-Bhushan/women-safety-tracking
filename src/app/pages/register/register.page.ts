import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  isSubmitting = false; // Prevent multiple clicks

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      age: [''],
      address: [''],
      emergencyContact1: [''],
      emergencyContact2: [''],
      emergencyCall: [''],
    });
  }

  async register() {
    if (this.registerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true; // Prevent multiple clicks

      try {
        console.log('Registering user:', this.registerForm.value);

        await this.authService.signUp(
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value
        );

        await this.showToast('Registration successful! Redirecting...');
        
        this.router.navigate(['/login']);
        this.registerForm.reset()

      } catch (error) {
        this.showToast('Registration failed. Please try again.');
      } finally {
        this.isSubmitting = false; // Allow further submissions
      }
    }
  }

  goBack() {
    this.navCtrl.back();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();
  }
}
