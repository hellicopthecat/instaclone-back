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
type Mutation{
    createUser(
    userName:String!
    firstName:String!
    lastName:String
    email:String!
    password:String!
    ):user
}
`;
export default typeDefs;
