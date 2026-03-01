import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import backG from '../assets/backG.jpeg';
import { Context as AuthContext} from '../Context/AuthContext';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const {state : {LoginData,LoginStatus,},UserLogin,clearLoginStatus}=React.useContext(AuthContext)


useEffect(() => {
  if (LoginStatus === 200) {
    navigate('HomeScreen'); 
    console.log("Login successful"); 
    clearLoginStatus();
  } else if (LoginStatus === 400 || LoginStatus === 404) {
    alert('Invalid credentials');
  }
}, [LoginStatus, navigate, clearLoginStatus]);

// useEffect(() => {
//   if (!loginAttempted) return; // ignore before first login attempt

//   if (LoginStatus === 200) {
//     navigate('/app/HomeScreen'); 
//     console.log("Login successful"); 
//     clearLoginStatus();
//     setLoginAttempted(false); // reset after success
//   } else if (LoginStatus === 400 || LoginStatus === 404) {
//     alert('Invalid credentials');
//     setLoginAttempted(false); // reset after failure
//   }
// }, [LoginStatus, loginAttempted, navigate, clearLoginStatus]);
  const handleLogin = async (e) => {
  e.preventDefault(); // must be inside the function

  try {
    if (email !== "" && password !== "") {
      await UserLogin({ email, password }); // await async login
      console.log("Login attempt sent");   
    } else {
      console.log("Please enter email and password");
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};
 

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${backG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Paper elevation={5} sx={{ padding: 8, width: 550 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

       <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
          >
            Login
          </Button>

          {/* Signup Button */}
          <Button
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/signup')}
          >
            Not a user? Sign up
          </Button>
        </form>
      </Paper>
    </Box>
  );
}