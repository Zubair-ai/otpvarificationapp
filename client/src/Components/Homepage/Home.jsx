import { Button, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthenticationUserContext } from "../../AuthContext.js/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const ctx = useContext(AuthenticationUserContext);
  const { setIsAuthenticatedUser } = ctx;
  const Navigate = useNavigate();
  const LogoutHandler = () => {
    setIsAuthenticatedUser(false);
    Navigate("/login");
  };
  return (
    <Stack>
      <Typography textAlign={"center"} variant="h3">
        WellCome to Home page
      </Typography>
      <Typography variant="h6" textAlign={"center"}>you have successfully login</Typography>
      <Stack mt={5} display="flex" alignItems={"center"}>
        <Stack sx={{ width: "100px" }}>
          <Button variant="contained" onClick={LogoutHandler}>
            Logout
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Home;
