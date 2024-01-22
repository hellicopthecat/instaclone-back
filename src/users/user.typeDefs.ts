export default `#graphql
scalar Upload
type User{
    id:Int!
    userName:String!
    firstName:String!
    lastName:String
    email:String!
    createAt:String!
    updatedAt:String!
    bio:String
    avatar(file:Upload!):Upload
    photos:[Photo]
    follower:[User]
    following:[User]
    totalFollowing:Int!
    totalFollowers:Int!
    isMe:Boolean!
    isFollowing:Boolean!
}
`;
