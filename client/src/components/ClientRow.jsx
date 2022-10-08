import { FaTrash } from 'react-icons/fa';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';

function ClientRow({ client }) {
	const [mutateFunction, { data, loading, error }] = useMutation(
		DELETE_CLIENT,
		{
			variables: { id: client.id },
			// refetchQueries: [{ query: GET_CLIENTS }], // Solution 1
			update(cache, { data: { deleteClient } }) {
				const { clients } = cache.readQuery({ query: GET_CLIENTS });

				cache.writeQuery({
					query: GET_CLIENTS,
					data: {
						clients: clients.filter((client) => client.id !== deleteClient.id),
					},
				});
			},
		}
	);
	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className='btn btn-danger btn-sm' onClick={mutateFunction}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
}

export default ClientRow;
