import AppLoading from 'expo-app-loading';
import React from 'react';
import { Routes } from './src/Navigators/Routes';
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

const App: React.FC = () => {
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
  // const networkInterface = createNetworkInterface({ uri: `http://10.0.2.2:8080/graphql` });
  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
export default App;
