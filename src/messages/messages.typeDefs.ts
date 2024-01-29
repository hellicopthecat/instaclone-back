export default `#graphql
type Message {
    id:Int!
    createAt:String!
    updatedAt:String!
    payload:String!
    user: User!
    room: Room!
    read:Boolean!
}
type Room {
    id:Int!
    users:[User]
    messages:[Message]
    unReadTotal:Int!
    createAt:String!
    updatedAt:String!
}
`;
