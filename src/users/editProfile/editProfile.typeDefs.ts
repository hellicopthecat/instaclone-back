export default `#graphql
type editResult {
    ok:Boolean!
    error:String
}
type Mutation{
    editProfile(
    firstName:String
    lastName:String
    password:String
    ):editResult!
}
`;
