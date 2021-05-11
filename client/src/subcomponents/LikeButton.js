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
      <Button color="green">
        <Icon name="rocket" />
      </Button>
    ) : (
      <Button color="green" basic>
        <Icon name="rocket" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="green" basic>
      <Icon name="rocket" />
    </Button>
  );

  return (
    <>
    
      <Button as="div" labelPosition="right" onClick={likePost} content={liked ? 'Unlike' : 'Like'}>{likeButton}
      <Label basic color="green" pointing="left">
        {likeCount}
      </Label>
      </Button>
      
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