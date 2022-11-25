import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from 'next/image'
const Footer = () => {
  const theme = useTheme();
  return (
    <div style={{  backgroundColor: "red", bottom: 0, height: "60px", display:"flex",position:"fixed",width:"100%",justifyContent:"center"}}>
     ©Copyright NITMX 2022 ,All Right Reserved
    </div>
  );
};

export default Footer;