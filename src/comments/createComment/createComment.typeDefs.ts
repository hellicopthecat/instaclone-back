export default `#graphql
type CreateCommentResult{
    ok:Boolean!
    error:String
}
type Mutation{
    createComment(photoId:Int!,payload:String!):CreateCommentResult!
}
`;