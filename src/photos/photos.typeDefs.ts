export default `#graphql
type Photo{
    id:Int!
    createAt: String!
    updatedAt:String!
    user:User! 
    file:String!
    caption:String
    hashtags:[Hashtag]
    totalLikes:Int!
    owner:Boolean!
    isLiked:Boolean!
    totalComments:Int!
    comments:[Comment]
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
