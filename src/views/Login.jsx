import React, { useState, useEffect } from "react";
import { Link as LinkReact, useNavigate } from "react-router-dom";
import NavPublic from "../components/layout/navigation/Navbar/NavPublic";
import LinkButton from "../components/layout/navigation/LinkButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link as LinkMui, TextField, Button } from "@mui/material";
import { login } from "../services/user-service";
import ButtonGreen from "../components/layout/navigation/ButtonGreen";

const LoginMui = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null); 

  const navigate = useNavigate();

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login(formData);
      setUser(data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/profile");
      } else {
        console.error("Token is missing from the response");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavPublic />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          padding: "6rem",
        }}
      >
        <Box
          component="form"
          sx={{
            p: 5,
            display: "flex",

            width: "50vw",
            margin: "auto",
            gap: "2rem",
            flexDirection: "column",

            alignItems: "center",
            "& .MuiTextField-root": {
              mb: 3,
              width: "100%",
            },
            "& .MuiButton-root": {
              width: "100%",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "main.primary",
              color: "main.primary",
            },
          }}
          onSubmit={handleSubmit}
        >
          <Typography color="main.tertiary" variant="h3">
            Log In
          </Typography>

          <TextField
            sx={{ minWidth: "30%" }}
            label="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password "
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <ButtonGreen
            text='Log In'
          />
        </Box>
        <Typography variant="p">
         
        </Typography>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          variant="p"
        >
          New user?{" "}
          <LinkButton
            text="Sign Up"
            to="/signup"
            color='main.buttons'
          />
        </Typography>
      </Box>
    </>
  );
};

export default LoginMui;
