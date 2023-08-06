# Blog App
#### Mobile application for personal blogging with [![](https://github.com/MarynaNakvas/blog-app-react-native/blob/main/blog-app-react-native/assets/logo_react_native.png)](https://reactnative.dev/)

## Installation
##### Mobile device
To use the app on a mobile device, you need to install the Expo Go app.
And scan the QR code provided below. The ready-to-use application will open via Expo Go.

![QR code](https://github.com/MarynaNakvas/blog-app-react-native/blob/main/blog-app-react-native/assets/qrCode.png "QR code")

##### Mobile device emulators or web browser
To launch the application in the browser, follow these steps:
- clone this repo [by link](https://github.com/MarynaNakvas/blog-app-react-native)
- run `npm install` to install dependencies
- run `npx expo start --android` to launch the application in android emulator
- run `npx expo start --ios` to launch the application in ios emulator
- run `npx expo start --web` to launch the application in the browser
- use the app at `http://localhost:19006/`
- run `npm lint` to run eslint and prittier
- run `npm test` to test app for errors


To run the application on the emulator, make sure that they are on your computer. You can also use [BrowserStack](https://www.browserstack.com/?utm_source=google&utm_medium=cpc&utm_platform=paidads&utm_content=602316486181&utm_campaign=Search-Brand-Tier3-EMEA-CL&utm_campaigncode=BrowserStack-Alpha+1011515&utm_term=e+browserstack&gclid=CjwKCAjww7KmBhAyEiwA5-PUSkfA6jS9_tlCYZ1LlTnlxwOAegcRUdv9HWlEUKq899S_QKwTKUQ19BoCaU0QAvD_BwE).

## Features
To use the application, you need to log in to the application under your data.  When using the app for the first time, you need to sign up: enter your name, email and password, or using Google.
The application is designed to create, view and delete blog entries. It is also possible to add an entry to favorites. Implemented a side burger menu, and a bottom menu to switch between the screens of all posts and favorite posts. When creating a new record, the user will be asked for permissions to access the camera and the gallery with pictures.
When creating a new entry, you can take a new picture or select one of the existing ones in the gallery. To do this, the user must allow the app to use the resources of the device.

## Tech
When creating the application, the following technologies were used:

- [React Native](https://reactnative.dev/) - software framework to develop the Android and iOS applications
- [Expo](https://expo.dev/) - an open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React
- [Redux](https://redux.js.org/) - an open-source JavaScript library for managing and centralizing application state
- [Redux-thunk](https://github.com/reduxjs/redux-thunk) - the middleware allows to work with asynchronous code  
- [Redux Toolkit](https://redux-toolkit.js.org/) - an opinionated toolset for efficient Redux
- [Firebase](https://firebase.google.com/) - it was used as a database and authentication service in the project
- [Jest](https://jestjs.io/) - JavaScript testing framework

The application has automatic CI/CD configured using CircleCI and Expo.
