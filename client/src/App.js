import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Header from './components/Header';
import Client from './components/Client';

// There was an issue when we use update() in useMutation
// this is the solution
const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				// projects: {
				// 	merge(existing, incoming) {
				// 		return incoming;
				// 	},
				// },
			},
		},
	},
});
const client = new ApolloClient({
	uri: 'http://localhost:3333/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Header />
				<div className='container'>
					<Client />
				</div>
			</ApolloProvider>
		</>
	);
}

export default App;
