export default `#graphql
type FollowUserResult{
    ok:Boolean!
    error:String
}
type Mutation{
    followUser(userName:String!):FollowUserResult
}
`;
