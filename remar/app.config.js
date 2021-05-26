import 'dotenv/config';
// import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: 'digiq-854ab.firebaseapp.com',
//   projectId: 'digiq-854ab',
//   storageBucket: 'digiq-854ab.appspot.com',
//   messagingSenderId: '755662745609',
//   appId: '1:755662745609:web:2a167f10a8e690b63708d8',
//   measurementId: 'G-JYSEC4VWBC',
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// } else {
//   firebase.app(); // if already initialized, use that one
// }

export default {
  name: 'DigiQ',
  slug: 'DigiQ',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
};
