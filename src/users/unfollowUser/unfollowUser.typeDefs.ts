export default `#graphql
type UnfollowUserResult{
    ok:Boolean!
    error:String
}
type Mutation{
    unFollowUser(userName:String!):UnfollowUserResult
}
`;
