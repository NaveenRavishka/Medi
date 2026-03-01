import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem
} from '@mui/material';
import backG from '../assets/backG.jpeg';
import { Context as AuthContext} from '../Context/AuthContext';

export default function SignupScreen() {
const {state : {LoginData,LoginStatus,RegisterData,Registerstatus,},clearUserRegisterStatus,RegisterUser,UserLogin}=React.useContext(AuthContext)

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSignup = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.password) {
    alert("Please fill required fields");
    return;
  }

  // Call backend
  await RegisterUser(formData); // Sends all formData to backend

  // Check status after registering
  if (Registerstatus === 201) {
    alert("Signup Successful!");
    navigate("/"); // go to login page
    clearUserRegisterStatus()
  } else {
    alert("Signup failed, please try again");
  }
};
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Paper elevation={6} sx={{ padding: 5, width: 500 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSignup}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            margin="normal"
            value={formData.age}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            select
            label="Sex"
            name="sex"
            margin="normal"
            value={formData.sex}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Address"
            name="address"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3 }}
          >
            Sign Up
          </Button>

          <Button
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate('/')}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}