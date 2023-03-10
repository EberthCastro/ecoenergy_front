import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircleIcon from "@mui/icons-material/Circle";

function BarData({ color, datas }) {
  return (
    <List
      sx={{
        p: { xs: 1, sm: 1, md: 1, xl: 1 },
        width: "100%",
        maxWidth: 500,
        color: { color },
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <CircleIcon sx={{ color: { color } }} />
        </ListItemAvatar>
        <ListItemText primary={datas.name} sx={{ color: "black" }} />
        <ListItemText primary={datas.expense} sx={{ color: "black" }} />
      </ListItem>
    </List>
  );
}

export default BarData;
