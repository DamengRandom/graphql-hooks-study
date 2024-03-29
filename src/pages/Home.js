import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard';

function Home() {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const posts = data && data.getPosts ? data.getPosts : [];
  if(posts) {
    console.log(posts);
  }
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h2>Recent posts</h2>
      </Grid.Row>
      <Grid.Row>
        {loading ? <p>Loading ..</p> : posts && posts.map(post => 
          <Grid.Column key={post.id} style={{ marginBottom: '20px' }}><PostCard key={post.id} post={post} /></Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      body
      username
      createdAt
      likeCount
      likes{
        username
      }
      commentCount
      comments{
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default Home;