import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../subcomponents/PostCard';
import PostForm from '../subcomponents/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Posts() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts}={}} = useQuery(FETCH_POSTS_QUERY)

  if(posts){
      console.log(posts)
  }

  return (
    <Grid className="grid" columns={1}>
      <Grid.Row >
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        </Grid.Row>
        <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
        <Grid.Row columns={2}>
        {loading ? (
          <h1>LOADING.. please wait</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 15 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
      {/* <Grid.Row only='small screen'>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        </Grid.Row>
        <Grid.Row className="page-title" only='small screen'>
        <h1>Recent Posts</h1>
      </Grid.Row>
        <Grid.Row columns={1} only='small screen'>
        {loading ? (
          <h1>LOADING.. please wait</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 15 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row> */}
    </Grid>
  );
}

export default Posts;

