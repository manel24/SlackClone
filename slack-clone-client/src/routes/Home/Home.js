import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const Home = props => {
    const { loading, error, data } = useQuery(gql`
    {
     allUsers {
         id
         email
     } 
      }
  `);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.allUsers.map(({ id, email }) => (
        <div key={id}>
            <p>
                {id}: {email}
            </p>
        </div>
    ));
}

export default Home;
