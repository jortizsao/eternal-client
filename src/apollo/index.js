import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { toIdValue } from 'apollo-utilities';
import VueApollo from 'vue-apollo';

export default function ({ authentication }) {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_URL,
  });
  const persistedQueryLink = createPersistedQueryLink({ useGETForHashedQueries: true });

  const authLink = setContext((_, { headers, secured }) => {
    return {
      headers: {
        ...headers,
        ...(secured && authentication.token && { Authorization: `Bearer ${authentication.token}` }),
      },
    };
  });

  const cache = new InMemoryCache({
    cacheResolvers: {
      Query: {
        product: (_, args) =>
          toIdValue(cache.config.dataIdFromObject({ __typename: 'Product', id: args.id })),
      },
    },
  });

  Vue.use(VueApollo);

  return new ApolloClient({
    link:
      process.env.NODE_ENV === 'production'
        ? authLink.concat(persistedQueryLink).concat(httpLink)
        : authLink.concat(httpLink),
    cache,
    connectToDevTools: true,
  });
}
