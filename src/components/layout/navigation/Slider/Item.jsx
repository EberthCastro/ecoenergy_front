import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Container from '@mui/material/Container';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  color: theme.palette.text.primary,
  maxWidth: 1000,
  margin: 'auto',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
}));

const StyledCardMedia = styled(CardMedia)({
  width: 75,
});

export default function MediaCard({item}) {

  const baseUrl = import.meta.env.VITE_IMAGES_URL;
  const [forums, setForums] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getForums = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.get('http://127.0.0.1:8000/api/forums', { headers });
        setForums(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getForums();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const numSlides = 3;
  const numForums = forums.length;

  const forumsToShow = forums.slice(Math.max(forums.length - numSlides, 0));

  return (
    <Container
      value={value}
      min={0}
      step={1}
      max={numForums - numSlides}
      onChange={handleChange}
      sx={{ width: '100%' }}
    >
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
        {/* {forumsToShow.map((forum) => ( */}
          <StyledCard key={item.id}>
            <StyledCardMedia component="img" image={baseUrl+item.image} alt="" />
            <Typography variant="h6">{item.title}</Typography>
            <Typography>{item.description}</Typography>
            <Typography>{item.autor}</Typography>
            <Typography variant="caption">
              {new Date(item.created_at).toLocaleTimeString([], 
              { hour: '2-digit', minute: '2-digit', hour12: false })}
            </Typography>
          </StyledCard>
        {/* ))} */}
      </Box>
    </Container>

  );
}
