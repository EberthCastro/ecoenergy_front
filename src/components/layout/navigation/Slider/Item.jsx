import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


export default function Item({ item }) {
  const baseUrl = import.meta.env.VITE_IMAGES_URL;
 
  return (

    <>
      <Container
        sx={{
          p: { xs: 0, sm: 0, md: 0, xl: 0 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="200"
              sx={{
                objectFit: "cover",
                minWidth: {
                  xs: "200px",
                  sm: "300px",
                  md: "250px",
                  lg: "250px",
                },
              }}
              image={baseUrl + item.image}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                textAlign: "left",
                width: "100%",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                height:'100%',
                padding: "10px",
              }}
            >
              <Typography variant="h6">{item.title} </Typography>
              
              <Typography>@{item.autor} </Typography>
              <Typography variant="caption">
              {(() => {
                const created = new Date(item.created_at);
                const now = new Date();
                const diffMs = now - created;
                const diffMins = Math.floor(diffMs / (1000 * 60));
                const diffHours = Math.floor(diffMins / 60);
                if (diffMins < 60) {
                  return `${diffMins} min ago`;
                } else {
                  return `${diffHours} h ago`;
                }
              })()}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Container>
    </>

  );
}
