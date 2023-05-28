import React, { useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { AuthenticationUserContext } from "../../AuthContext.js/AuthContext";
import toast from "react-hot-toast";
import ModalOverlay from "../Modal/ModalOverlay";

const LoginPage = () => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const ctx=useContext(AuthenticationUserContext);
    const {UserData, setUserData}=ctx;
  const submitHandler = async (e)=>{
    e.preventDefault();
    if (password.length < 5) {
        alert("Password must be at least 5 characters.");
        return;
      }
      try {
        const res = await axios.post("http://localhost:8000/api/loginuser",{ name:email, password:password });
        if (res && res.data.success) {
          setUserData({
            user: res.data.registeruser,
          });
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally{
        setOpen(true)
      }
  }
  return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height: "100vh",
    width:"100%",}}>
     <form onSubmit={submitHandler}> <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          height: "400px",
          width:"300px",
        }}
      >
        <Typography variant="h5" color="primary">Login</Typography>
        <TextField required color="primary" onChange={(e)=>{setEmail(e.target.value)}} label="UserEmail" size="small" fullWidth variant="outlined" type="email" />
        <TextField required onChange={(e)=>{setPassword(e.target.value)}} label="Password" size="small" fullWidth variant="outlined" type="password" />
        <Button variant="contained" fullWidth type="submit" >Submit</Button>
      </Box></form>
      <ModalOverlay open={open} setOpen={setOpen} id={UserData?.user?._id} email={email}/>
    </Box>
  );
};

export default LoginPage;
