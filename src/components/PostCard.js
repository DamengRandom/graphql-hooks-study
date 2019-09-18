import React from 'react';
import { Button, Card, Image, Icon, Label } from 'semantic-ui-react';
import moment from "moment";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  const { id, username, body, likes, createdAt, likeCount, comments, commentCount } = post;
  const likePost = () => {
    console.log('like post');
  };
  const likeComment = () => {
    console.log('like comment');
  }
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right' onClick={likePost}>
          <Button color='teal' basic>
            <Icon name='heart' />
          </Button>
          <Label basic color='teal' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right' onClick={likeComment}>
          <Button color='red' basic>
            <Icon name='comment' />
          </Button>
          <Label basic color='red' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
}
