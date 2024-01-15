const typeDefs = `#graphql
type user{
    id:Int!
    userName:String!
    firstName:String!
    lastName:String
    email:String!
    createAt:String!
    updatedAt:String!
}
type Query{
    users:[user]!
    user(userName:String!):user
}
`;
export default typeDefs;
