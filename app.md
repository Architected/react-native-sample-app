# Introduction

This react native sample is a file management application that utilises the Architected Back-end-as-Service APIs for all back-end interactions.

The services used in this fully functional sample application include the following:

- IAM to manage sign-up, sign-in and password reset
- File to manage file upload, download and listing

The architected service is accessed via the npm package [architected-client](https://www.npmjs.com/package/architected-client) that ensures consistent API access across Javascript clients.

_Note this package is also used in the next js sample apps_

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/rn-interactions.png" width="800">

# Features

The application is a simple file manager that allows an email/password sign-up/sign-in experience and the ability to upload, view and download images for a user account.

# Setup

The following guide will take you through the steps to get the application working with Visual Studio Code, Expo and Android Studio on your local machine. If you are new expo and react native it may be worth to spend a few minutes familiarising with the basics [https://docs.expo.dev/tutorial/planning/] but that is not essential for this demo.

Before continuing please ensure you have created both an account and an application within the Architected management portal. If you have not done this instructions can be found here:

- [Create an account](https://github.com/Architected/next-js-sample-app/wiki/2-Creating-an-account)
- [Create your first application](https://github.com/Architected/next-js-sample-app/wiki/4-Creating-an-application)

## Step 1 Install Expo cli tools

This project uses the Expo cLI to initialize and serve your project. From a command prompt run the following command to install it globally on your development machine.

```
npm install --global expo-cli
```

## Step 2 Install Android Studio

To test the android version of the application we need to install Android Studio so that we can run a virtual device. To install the latest version of Android Studio visit https://developer.android.com/studio and install the latest version for your platform.

## Step 3 Create an Android Virtual Device

To create an Android virtual device on your machine please follow this instructions in this [guide](https://github.com/Architected/next-js-sample-app/wiki/5-Creating-an-AVD)

## Step 4 Clone Repo

Open a cmd prompt shell and run the following commands to clone the project into your chosen working folder and launch vscode:

```
git clone https://github.com/Architected/react-native-sample-app.git
cd react-native-sample-app
code .
```

## Step 5 Install packages

Within Visual Studio Code open a new terminal from the Terminal menu and run the following command to install project dependancies.

```
expo install
```

## Step 6 Configure settings

In the project root create a file call **.env** and copy the contents of **env.template.app** into it.

These settings are all the environment variables that you will need to run the application.

The contents of .env should look like this

```
API_URL="https://your-api-url/api/v1.0/"
APP_KEY="your-app-key"
APP_ENV="your-app-env"
APP_NAME="your-app-name"
APP_MODE=app
APP_TIMEOUT=20000
```

## Step 7 Assign settings

Your application in the trial plan has two client environments to operate in, dev and uat, each with their own settings and secrets. For these steps we will assume use of the dev environment.

### 7.1 Configure public settings

Navigate to your application in the Architected portal and ensure that the selected environment is 'Development' as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/env-select.png" width="800">

Ensure that the Details tab is selected.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/details-tab.png" width="800">

From this tab make a note of the following values and update the respective settings in env.local:

- **Application Key** maps to **APP_KEY**
- **Api Url** maps to **API_URL**
- **Application Name** maps to **APP_NAME**

The public settings in env.local should look something like this:

```
API_URL="https://dz-api-dev-clnt-au.diztribute.com/api/v1.0/"
APP_KEY="your-app-key"
APP_NAME="Holiday Pics"
APP_ENV="dev"
APP_MODE="app"
APP_TIMEOUT=20000
```

As the mobile app only uses public settings there is on last configuration change that needs to be made to allow for a PKCE request to be made from front channel only. Navigate to Access Settings within the Settings tab and enable Front Channel as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/7-1-front-channel-select.png" width="800">

## Step 8 Launching Application

Once the settings have been saved the app is now ready to run. Open a terminal and run the command

```
expo start --clear
```

The metro bundler will be launched which allows for the application to be tested in a variety of ways.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/8-metro-bundler.png" width="800">

## Step 9 Verify Functionality

For these tests we will use the AVD that you created in step 3. Ensure that it is running and click Run on Android device/emulator from the metro bundler left hand menu.

The app should launch and land on the sign in screen.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-1-0-sign-in.png" width="300">

### 9.1 Sign up

You can now test creating a new user with an email and password that will use the IAM API.

**Sign up Step**

Click sign up to start and enter an email and password.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-1-1-sign-up.png" width="300">

**Verification Step**

For non-production environments all emails will be sent to the admin users inbox to prevent unsolicited messages being sent.

Enter the verication code sent to your inbox.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-1-2-signup-verification.png" width="300">

The email address entered will be subject to validation based on whether 'Mailbox Protection' is enabled.

If you encounter a validation warning this can be disabled in the management portal.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-4.png" width="800">

You will be able to see a record of the user registration by selecting App Users under the Application in the admin portal.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-8.png" width="800">

### 9.2 Sign in

Once you have successfully created and verified a user you can now attempt sign-in.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-2-1-sign-in.png" width="300">

Upon successfull sign-in you will land on the landing screen.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-2-2-landing-page.png" width="300">

### 9.3 Uploading a file

This section will verify that you are able to upload a file for the user using the file service.

From the homescreen click the upload file (+) icon.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-1-add-image.png" width="300">

On the add screen click the 'Select Photo' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-1-add-image.png" width="300">

Select the 'Photos' app for the file location

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-2-add-image.png" width="300">

Select a file from the list

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-4-add-image.png" width="300">

Click the 'Upload Photo' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-5-add-image.png" width="300">

Upon completion of the file upload you will be returned to the default file list.

Select the file to load the details screen

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-6-add-image.png" width="300">

Details Tab

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-7-add-image.png" width="300">

Attributes Tab

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/react-native-app/9-3-8-add-image.png" width="300">

If you have arrived here you have verified that the sample app is working as expected.
