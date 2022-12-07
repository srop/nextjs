import { ROLES } from "./role";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ALL = [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER];

export type MenuItem = {
  text: string;
  icon?: any;
  path: string;
  subMenu?: MenuItem[];
  iconOpened?: any;
  iconClosed?: any;
  auth: boolean;
  roles: string[];
};


export const PERMISSION_MAP: MenuItem[] = [
  {
    text: "Dashboard",
    path: "/",
    roles: ALL,
    auth: false,
    icon: <MailIcon style={{ color: "white" }} />,
  },
  {
    text: "Home",
    icon: <InboxIcon style={{ color: "white" }} />,
    path: "/home",
    roles: ALL,
    auth: true,
  },
  {
    text: "Stock",
    icon: <InboxIcon style={{ color: "white" }} />,
    path: "/stock",
    roles: ALL,
    auth: true,
  },
  {
    text: "Others",
    icon: <MenuIcon style={{ color: "white" }} />,
    path: "#",
    iconClosed: <ExpandLessIcon style={{ color: "white" }} />,
    iconOpened: <ExpandMoreIcon style={{ color: "white" }} />,
    roles: ALL,
    auth: true,
    subMenu: [
      {
        text: "Level 2",
        path: "/level2",
        icon: <InboxIcon style={{ color: "white" }} />,
        roles: ALL,
        auth: true,
      },
      {
        text: "Level 2",
        path: "/level2",
        icon: <InboxIcon style={{ color: "white" }} />,
        roles: ALL,
        auth: true,
      },
    ],
  },
  {
    text: "Setting",
    icon: <MenuIcon style={{ color: "white" }} />,
    path: "#",
    iconClosed: <ExpandLessIcon style={{ color: "white" }} />,
    iconOpened: <ExpandMoreIcon style={{ color: "white" }} />,
    roles: ALL,
    auth: true,
    subMenu: [
      {
        text: "Level1112",
        path: "/level211",
        icon: <InboxIcon style={{ color: "white" }} />,
        roles: ALL,
        auth: true,
      },
      {
        text: "Level222",
        path: "/level1112",
        icon: <InboxIcon style={{ color: "white" }} />,
        roles: ALL,
        auth: true,
      },
    ],
  },
];
