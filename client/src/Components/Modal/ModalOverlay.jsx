import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthenticationUserContext } from "../../AuthContext.js/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ModalOverlay({ open, setOpen, id,email }) {
  const [otp, setOtp] = React.useState("");
  const Navigate = useNavigate();
  const ctx = React.useContext(AuthenticationUserContext);
  const { setIsAuthenticatedUser } = ctx;
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/verifyotp", {
        id,
        otp,
      });
      if (res && res.data.success) {
        setIsAuthenticatedUser(true);
        Navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setOpen(false);
      setOtp("");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`you have received OTP at your given gmail account ${email}`}</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          {" "}
          <Stack>
            <TextField
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              sx={{ marginTop: "20px" }}
              label="Enter your OTP"
              size="small"
              fullWidth
              variant="outlined"
            />
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{marginTop:"40px"}}>
              <Button variant="outlined" type="submit">Submit</Button>
              <Button variant="outlined" onClick={handleClose}>Close</Button>
            </Stack>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}
