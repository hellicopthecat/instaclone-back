export default `#graphql
type Comment{
    id:Int!
    createAt:String!
    updatedAt:String!
    user:User!
    photo:Photo!
    payload:String!
    owner:Boolean!
}
`;
