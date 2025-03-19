**Project Installation Steps:-**

## Step 1: Install Ionic CLI (if not installed)
npm install -g @ionic/cli

## Step 2: Create a new Ionic-Angular project
ionic start women-safety-tracking blank --type=angular

## Step 3: Navigate to the project folder
cd women-safety-tracking

## Step 4: Add Android platform
ionic capacitor add android

## Step 5: Install required plugins
npm install @ionic-native/device-motion @awesome-cordova-plugins/device-motion
npm install @ionic-native/gyroscope @awesome-cordova-plugins/gyroscope
npm install @ionic-native/shake @awesome-cordova-plugins/shake
npm install @ionic-native/geolocation @awesome-cordova-plugins/geolocation

## Step 6: Generate authentication pages
ionic generate page pages/login
ionic generate page pages/register

## Step 7: Implement SOS Shake Detection
ionic generate service services/sos

## Step 8: Start the development server
ionic serve  # For browser preview

## Step 9: Build the project
ionic build

## Step 10: Sync with Capacitor
ionic capacitor sync android

## Step 11: Open the project in Android Studio
ionic capacitor open android

## Step 12: Run the app on an Android device/emulator
ionic capacitor run android  # To run on Android device/emulator


**Firebase Configuration Steps:-**
1. Create a Firebase Project
Go to the Firebase Console.
Click "Add Project" → Enter the project name → Click "Continue".
Disable Google Analytics (optional) → Click "Create Project".
Once created, click "Continue".

2. Add Firebase to Your Android App
Click "Add App" → Select Android.
Enter your Android package name (same as in android/app/src/main/AndroidManifest.xml).
Click "Register App".
Download the google-services.json file and place it inside:
android/app/
Click "Next" until the setup is done.

3. Install Firebase in Your Ionic Project
Run the following command in your Ionic project:
npm install firebase @angular/fire

4. Configure Firebase in Your Ionic Project
In your src/environments/environment.ts, add your Firebase config (from Firebase Console under Project Settings > General > Your Apps):

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
Also, update src/environments/environment.prod.ts with the same configuration.

