export default `#graphql
type toggleLikePhotoResult{
    ok:Boolean!
    error:String
}
type Mutation{
    toggleLikePhoto(id:Int!):toggleLikePhotoResult
}
`;
