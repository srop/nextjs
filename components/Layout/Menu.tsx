import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ListItem from "@mui/material/ListItem";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import Image from "next/image";
import logo from "@/public/static/images/NITMX-Logo.png"
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

type MenuProp = {
  open: boolean;
  onDrawerClose: () => void;
};
export type MenuItem = {
  text: string;
  icon?: React.ComponentType;
  path: string;
  subMenu?: MenuItem[];
  iconOpened?: any;
  iconClosed?: any;
};

const menuItems = [
  {
    text: "My Notes",
    icon: <MailIcon color="secondary" />,
    path: "/",
  },
  {
    text: "Create Note",
    icon: <InboxIcon color="secondary" />,
    path: "/home",
  },
  {
    text: "Others",
    Icon: <MenuIcon color="secondary" />,
    path: "#",
    iconClosed: <ExpandLessIcon />,
    iconOpened: <ExpandMoreIcon />,
    subMenu: [
      {
        text: "Level 2",
        path: "/level2",
        icon: <InboxIcon color="secondary" />,
      },
      {
        text: "Level 2",
        path: "/level2",
        icon: <InboxIcon color="secondary" />,
      },
    ],
  },
  {
    text: "Setting",
    Icon: <MenuIcon color="secondary" />,
    path: "#",
    iconClosed: <ExpandLessIcon />,
    iconOpened: <ExpandMoreIcon />,
    subMenu: [
      {
        text: "Level1112",
        path: "/level211",
        icon: <InboxIcon color="secondary" />,
      },
      {
        text: "Level222",
        path: "/level1112",
        icon: <InboxIcon color="secondary" />,
      },
    ],
  },
];

export default function Menu({ open, onDrawerClose }: MenuProp) {
  const theme = useTheme();

  const [isOpenCollapse, setIsOpenCollapse] = React.useState(null);

  const handleOpen = (clickedIndex: any) => {
    if (isOpenCollapse === clickedIndex) {
      setIsOpenCollapse(null);
    } else {
      setIsOpenCollapse(clickedIndex);
    }
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Image
          src={logo}
          alt="Picture of the author"
         
          style={{
            maxWidth: '150px',
            height: 'auto',
          }}
        />
        <IconButton onClick={onDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.path}>
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                // onClick={() => {
                //     handleClick(index)
                //   }}
                onClick={() => handleOpen(index)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon != null ? item.icon : <MenuIcon />}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />

                {/* {item.subMenu && showSubmenu ?<ExpandLess /> : <></> } */}
                {item.subMenu && isOpenCollapse === index ? (
                  <ExpandLessIcon />
                ) : item.subMenu && open ? (
                  <ExpandMoreIcon />
                ) : null}
              </ListItemButton>
            </ListItem>
            {item.subMenu !== null && (
              <Collapse
                in={isOpenCollapse === index}
                timeout="auto"
                unmountOnExit
                key={`${index}-subMenu`}
              >
                {item.subMenu?.map((isubMenu, subIndex) => {
                  return (
                    <Link href={isubMenu.path} >
                      <ListItem disablePadding key={isubMenu.text}>
                        <ListItemButton sx={{ pl: 5 }}>
                          <ListItemIcon>
                            {isubMenu.icon != null ? (
                              isubMenu.icon
                            ) : (
                              <MenuIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={isubMenu.text} key={isubMenu.text} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  );
                })}
              </Collapse>
            )}
          </Link>
        ))}
      </List>

      <Divider />
    </Drawer>
  );
}
