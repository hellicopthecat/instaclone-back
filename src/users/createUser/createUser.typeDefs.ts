export default `#graphql
type CreateAccountResult{
    ok:Boolean!
    error:String
}
type Mutation{
    createUser(
    userName:String!
    firstName:String!
    lastName:String
    email:String!
    password:String!
    ):CreateAccountResult!
}
`;
