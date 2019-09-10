export default `

type Team {
    id: Int!
    name: String!
    owner: String!
    members: [User!]!
    channels: [Channel!]!
}

type Mutation {
    createTeam(name: String! ): CreateTeamResponse!
    Team: Channel
}

type CreateTeamResponse {
    ok: Boolean!
    errors: [Error!]
  }

type Query {
    getTeam(id:Int!): Team!
    allTeams: [Team!]!
}
` 