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
} from '@apollo/client';

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
  // const networkInterface = createNetworkInterface({ uri: `http://10.0.2.2:8080/graphql` });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
export default App;
