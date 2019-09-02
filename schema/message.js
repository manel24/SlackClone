export default `

type Message {
    id: Int!
    text: String!
    channel: Channel!
    user: User!
}

type Mutation {
    createMessage(channelId:Int!,userId:Int!, text: String! ): Boolean
}
`