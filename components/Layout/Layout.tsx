import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Layout/Header";
import Menu from "@/components/Layout/Menu";
import Footer from "./Footer";

const drawerWidth = 240;
// interface LayoutProps {
//   childern: an
// }

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



export default function Layout(props:any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} onDrawerOpen={() => setOpen(true)} />
      <div style={{display:"flex",flexDirection: "row" }}>
      <Menu open={open} onDrawerClose={() => setOpen(false)} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
      <Footer></Footer>
      </div>
    </Box>
  );
}
