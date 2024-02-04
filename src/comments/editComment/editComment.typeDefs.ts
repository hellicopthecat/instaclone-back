export default `#graphql
type editCommentResult{
    ok:Boolean!
    error:String
}
type Mutation {
    editComment(id:Int! , payload:String!):MutationResponse!
}
`;
