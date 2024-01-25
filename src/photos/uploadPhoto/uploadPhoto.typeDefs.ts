export default `#graphql
type Mutation{
    uploadPhoto(file:Upload!,caption:String):Photo
}
`;
