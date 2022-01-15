import { ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client/core'
import {postType,storageType} from 'types/index'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://localhost:443/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})
export default class Graphql implements storageType{
  private client = apolloClient;
  async login(username : string, password : string) : Promise<string>{
    const result = await  this.client.query({
       query : gql`
        query{
          login(loginForm :{username : "${username}", password : "${password}"}){
            token
          }
        }
       `
     })
     return result.data.login.token;
   }
  async auth(key : string) : Promise<string>{
    const result = await this.client.query({
      query : gql`
        query{
          user(token : "${key}"){
            username
          }
        }
      `
    })
    return result.data.user.username;
  }
  async getPostList(key : string) : Promise<Array<postType>>{
    const result = await this.client.query({
      query : gql`
        query{
          user(token : "${key}"){
          posts{
            title
            text
            id
          }
        }
        }
      `
    })
    return result.data.user.posts;
  }
  async getPost(key : string, postId : string) : Promise<postType>{
    const result = await this.client.query({
      query : gql`
        query{
          user(token : "${key}"){
         post(id : "${postId}"){
           id
           title
           text
            }
          }
        }
      `
    })
    return result.data.user.post;
  }
  async deletePost(key : string, postId : string) : Promise<void>{
    await this.client.query({
      query : gql`
        mutation{
          deleteFile(id : "${postId}", token : "${key}"){
          error
        }
      }
        }
      `
    })
  }
  async createPost(key : string,newPost : postType) : Promise<postType>{
    const {title, text} = newPost
    const result = await this.client.query({
      query : gql`
        mutation{
          writeFile(
            payLoad : {
              title : "${title}",
              text : "${text}"
            },
            token : "${key}"
          ){
            id,
            title,
            text
          }
        }
      `
    })
    return result.data.writeFile;
  }
  async updatePost(key : string,post : postType) : Promise<postType>{
    const {title,text,id} = post;
    const result = await this.client.query({
      query : gql`
        mutation{
          writeFile(
            payLoad : {
              id : "${id}"
              title : "${title}",
              text : "${text}"
            },
            token : "${key}"
          ){
            id,
            title,
            text
          }
        }
      `
    })
    return result.data.writeFile
  }
  async checkOverLap(key : string,title :string) : Promise<boolean> {
    const posts : Array<postType> = await this.getPostList(key);
    const result : Array<postType> = posts.filter((post : postType) => post.title !== title);
    if (result.length === 0) return true;
    return false;
  }
}
