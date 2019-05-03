// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environments.ts` with `environments.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};
export const DEFAULT_CODE_LANG = 'es';
export const DEFAULT_SYMBOL_CURRENCY = 'US$';
export const SHOW_WINDOWS_BAR = false;
export const MAX_SIZE_IN_PX = 2500;
export const MAX_SIZE_IN_MB = 0.7;

export const WATCH_TYPES = {
  movement: 'movements',
  model: 'models',
  strap: 'straps',
  bunckle: 'bunckles',
  case: 'cases',
  crystal: 'crystals',
  crowns: 'crowns',
  caseBack: 'casesBack',
};

export const DBS = {
  // real: {
  //   apiKey: 'AIzaSyAh48TUW_EdI6fI6om3EMRCdlCC4U3n9U8',
  //   authDomain: 'moenamaindb.firebaseapp.com',
  //   databaseURL: 'https://moenamaindb.firebaseio.com',
  //   projectId: 'moenamaindb',
  //   storageBucket: 'moenamaindb.appspot.com',
  //   messagingSenderId: '427343243507'
  // },
  public: {
    apiKey: 'AIzaSyAZcu9JauJIWtaGQnDgLnJ3ZFg7RcEweAo',
    authDomain: 'publicpage-5b145-68fbf.firebaseapp.com',
    databaseURL: 'https://publicpage-5b145-68fbf.firebaseio.com',
    projectId: 'publicpage-5b145',
    storageBucket: 'publicpage-5b145.appspot.com',
    messagingSenderId: '610932498989'
  },
  main: {
    apiKey: 'AIzaSyC2yKQPYRZeTnF1rqFNtWkAC8JVBAXEMTI',
    authDomain: 'moena-1989.firebaseapp.com',
    databaseURL: 'https://moena-1989.firebaseio.com',
    projectId: 'moena-1989',
    storageBucket: 'moena-1989.appspot.com',
    messagingSenderId: '641564036734'
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
