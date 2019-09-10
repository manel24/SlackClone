import React from 'react';
import { graphql } from '@apollo/react-hoc';
import { gql } from 'apollo-boost';
import Teams from '../components/Teams';
import Channels from '../components/Channels';

import _ from 'lodash';
import decode from 'jwt-decode';


const Sidebar = ({ data: { loading, allTeams }, currentTeamId }) => {
    if (loading) return null;

    const teamIdx = _.findIndex(allTeams, ['id', currentTeamId]);
    const team = allTeams[teamIdx];
    console.log(team)
    let username = '';
    try {
        const token = localStorage.getItem('token')
        const { user } = decode(token)
        username = user.username;
        console.log(username)

    } catch (error) {
        console.log(error);
    }
    return [
        <React.Fragment>
            <Teams key="team-sidebar" teams={allTeams.map(team => (
                {
                    id: team.id,
                    letter: team.name.charAt(0).toUpperCase()
                }
            ))} />
            <Channels key="channels-sidebar"

                teamName={team.name}
                username={username}
                channels={team.channels}
                users={[{ id: 1, name: 'Manel' }, { id: 2, name: 'Zaid' }]}
            />
        </React.Fragment>]

}

const allTeamsQuery = gql`
{
    allTeams {
        id
        name
        channels {
            id 
            name
        }

    }
}
`

export default graphql(allTeamsQuery)(Sidebar);