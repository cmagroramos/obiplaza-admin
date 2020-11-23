// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAIyRiTicUxMPuxid_nvWn3QLxT3Fbhigo",
    authDomain: "obiplaza-dedoclic.firebaseapp.com",
    databaseURL: "https://obiplaza-dedoclic.firebaseio.com",
    projectId: "obiplaza-dedoclic",
    storageBucket: "obiplaza-dedoclic.appspot.com",
    messagingSenderId: "238666934365",
    appId: "1:238666934365:web:9ed501ddbd7fdf796705b4",
    measurementId: "G-38EDGFSVH0"
    // apiKey: 'AIzaSyAIyRiTicUxMPuxid_nvWn3QLxT3Fbhigo',
    // authDomain: 'obiplaza-dedoclic.firebaseapp.com',
    // databaseURL: 'https://obiplaza-dedoclic.firebaseio.com',
    // projectId: 'obiplaza-dedoclic',
    // storageBucket: 'obiplaza-dedoclic.appspot.com',
    // messagingSenderId: '238666934365',
    // appId: '1:238666934365:web:9ed501ddbd7fdf796705b4',
    // measurementId: 'G-38EDGFSVH0'
  },
  title: 'Admin!!',
  currency:  {
    locale: 'es',
    code: 'EUR',
    display: 'symbol'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
