// @ts-ignore
import { FIREBASE_API_KEY } from '@env';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { Routes } from './src/Navigators/AllRoles/Routes';
import {
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import firebase from 'firebase/app';
import { LogBox } from 'react-native';

const App: React.FC = () => {
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: 'digiq-854ab.firebaseapp.com',
    projectId: 'digiq-854ab',
    storageBucket: 'digiq-854ab.appspot.com',
    messagingSenderId: '755662745609',
    appId: '1:755662745609:web:2a167f10a8e690b63708d8',
    measurementId: 'G-JYSEC4VWBC',
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Error: Access denied!']);
  let [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const httpLink = createHttpLink({
    uri: 'http://192.168.0.16:5000/graphql',
  });
  const wsLink: any = new WebSocketLink({
    uri: `ws://192.168.0.16:5000/subscriptions`,
    options: {
      reconnect: true,
    },
  });
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            project: {
              merge: true,
            },
          },
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
export default App;
