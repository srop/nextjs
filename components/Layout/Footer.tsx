import { Box, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "next/image";
const Footer = () => {
  const theme = useTheme();
  return (
    <div
      style={{
        borderTop: "1px solid #b8b8b8",
      fontSize:"13px",

        backgroundColor: "#424242",
        bottom: 0,
        alignItems: "center",
        height: "60px",
        display: "flex",
        position: "fixed",
        width: "100%",
        justifyContent: "center",
        color:"white",
        paddingRight : "10px"
      
      }}
    >
      <span style={{paddingRight:"10px"}}>Powered by National ITMX &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Copyright © NITMX 2022 ,All Right Reserved</span>
    </div>
  );
};

export default Footer;
