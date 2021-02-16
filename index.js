const { ApolloServer } = require('apollo-server');
const gql =require ('graphql-tag');
const mongoose = require('mongoose');

const Post = require('./models/Post');
const { MONGODB } = require ('./config.js');


const typeDefs = gql `
    type Post{
        id: ID!,
        body:String!,
        created:String!,
        username:String!
    }
    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts(){
            try{
                const posts = await Post.find(); //if not called specifically, will show all
                return posts
            } catch(err){
                throw new Error(err)
            }
        }
    }
    
}

const server = new ApolloServer ({
    typeDefs: typeDefs,
    resolvers: resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log('I sense a connection!')
        return server.listen({ port: 5000 })
    })
        .then((res) =>{
            console.log(`Server running at ${res.url}`)
         
    })

