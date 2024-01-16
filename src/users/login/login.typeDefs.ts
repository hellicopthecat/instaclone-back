export default `#graphql
type loginResult{
    ok:Boolean!
    error:String
    token:String
}
type Mutation{
    login(userName:String!,password:String!):loginResult
}
`;
