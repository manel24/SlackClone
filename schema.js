export default `

type Team {
    id: Int!
    name: String!
    owner: String!
    members: [User!]!
    channels: [Channel!]!
}

type User {

    id: Int!
    username:String!
    email:  String
    password: String
    team: Team!
    channels: [Channel!]!
}


type Message {
    id: Int!
    text: String!
    channel: Channel!
    user: User!
}

type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    members: [User!]!
}

type Query {
    hi: String
}
`