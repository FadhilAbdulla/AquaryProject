'use client'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import LinearProgress from '@mui/material/LinearProgress';


export default function Home() {

  const [PostsData, setPostsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (response.ok) {
          const data = await response.json();
          setPostsData(data)
          console.log(data[0])
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false)
    };

    fetchData();

  }, [])

  const router = useRouter()


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:  '#ffffe3' ,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%'

  }));

  const style = {
    py: 0,
    width: '100%',
    maxWidth: 360,
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'background.paper',
  };

  const navigateoAnotherPage = (id) => {
    router.push(`/posts/${id}`, { scroll: false })

  }

  return (
    <div>
      {loading ?
        <Box sx={{ flexGrow: 1 }}>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="BlockPageHeading">Welcome to the Blog Page</div>
            </Grid>
          </Grid>
          <LinearProgress />
        </Box>
        :
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="BlockPageHeading">Welcome to the Blog Page</div>
            </Grid>

            {PostsData && PostsData.map((post, index) => (
              <Grid item xs={12} sm={4} md={3} id={post.id} onClick={() => navigateoAnotherPage(post.id)} >
                <Item>
                  <div className="PostTitle">{post.title}</div>
                  <hr></hr>
                  <div className="PostBody">{post.body}</div>

                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      }</div>
  );
}