'use client'
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';


const UserProfile = ({ params }) => {

    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.PostId}`);
                const comments = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.PostId}/comments`);
                if (response.ok) {const data = await response.json();setPost(data)}
                if (comments.ok) {const commentdata = await comments.json();setComments(commentdata)}
            } catch (error) {console.error('Error fetching data:', error);}
            setLoading(false)
        };
        fetchData();
    }, [])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff5e8',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%'

    }));


    return (
        <div>
            {loading ?
                <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress />
                </Box>
                : <div >
                    <div className="IndividualPostTitle">{post.title}</div>
                    <div className="IndividualPostBody">{post.body}</div>
                    <div className="mt-8">
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid item xs={12}>
                                {comments && comments.length > 0 && <div className="CommentPageHeading">Comments</div>}
                            </Grid>
                            <Grid container spacing={2}>
                                {comments && comments.map((comment, index) => (
                                    <Grid item xs={12} sm={4} md={3} id={comment.id} >
                                        <Item>
                                            <div className="CommentTitle">{comment.name}</div>
                                            <hr></hr>
                                            <div className="CommentEmail">{comment.email}</div>
                                            <hr></hr>
                                            <div className="CommentBody">{comment.body}</div>
                                        </Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </div>
                </div>}
        </div>
    );
};

export default UserProfile;