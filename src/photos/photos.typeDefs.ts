export default `#graphql
type Photo{
    id:String!
    createAt: String!
    updatedAt:String!
    user:User! 
    file:String!
    caption:String
    hashtags:[Hashtag]
    totalLikes:Int!
    owner:Boolean!
    comments:Int!
}
type Hashtag{
    id:String!
    createAt: String!
    updatedAt:String!
    hashtag:String!
    photos(page:Int!):[Photo]
    totalPhoto:Int!
}
type Like{
    id:String!
    createAt: String!
    updatedAt:String!
    photo:Photo!
}
`;
