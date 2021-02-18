import  { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
  query{
    getPosts {
      id
      body
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
      }
    }
  }
`;


// export const FETCH_POST_QUERY = gql`
//     query{
//       getPost {
//         postId
//         body
//         commentCount
//         comments{
//           id
//           likeCount
//         }
//         likes{
//           username
//         }
//       }
//     }
// `