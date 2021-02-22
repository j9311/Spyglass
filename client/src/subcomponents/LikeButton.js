import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

// import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="orange">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="orange" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="orange" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <>
    
      <Button as="div" labelPosition="right" onClick={likePost} content={liked ? 'Unlike' : 'Like'}>{likeButton}</Button>
      <Label basic color="orange">
        {likeCount}
      </Label>
      
    </>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;