export default `#graphql
type seeFollowingResult{
    ok:Boolean!
    error:String
    following:[User]
    totalPages:Int
}
type Query{
    seeFollowing(userName:String!, lastId:Int):seeFollowingResult!
}
`;
