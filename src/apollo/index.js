import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

export default function () {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URL,
  });

  Vue.use(VueApollo);

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}
