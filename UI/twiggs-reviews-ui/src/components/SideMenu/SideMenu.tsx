import React from "react";
import { Theme, CSSObject } from "@mui/material/styles";
import NextLink from "next/link";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import MenuIcon from "@mui/icons-material/menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import scss from "./SideMenu.module.scss";
import HomeIcon from "@mui/icons-material/Home";
import DrawIcon from "@mui/icons-material/Draw";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsIcon from "@mui/icons-material/Collections";
import FeedIcon from "@mui/icons-material/Feed";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import LogoutIcon from "@mui/icons-material/Logout";
import ThemeToggleSwitch from "../ThemeToggleSwitch/ThemeToggleSwitch";
import useSideMenuLogic from "./useSideMenuLogic";
import { Box } from "@mui/material";

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

const menuRouteList = [
  "",
  "animations",
  "books",
  "comics",
  "shows",
  "reviews",
  "",
];
const menulistTranslations = [
  "Home",
  "Animations",
  "Books",
  "Comics",
  "Shows",
  "Reviews",
  "Sign Out",
];
const menuListIcons = [
  <HomeIcon />,
  <DrawIcon />,
  <MenuBookIcon />,
  <CollectionsIcon />,
  <VideoCameraBackIcon />,
  <FeedIcon />,
  <LogoutIcon />,
];

export type SideMenuProps = {
  ColorModeContext: React.Context<{ toggleColorMode: () => void }>;
};

const SideMenu = () => {
  const {
    handleDrawerToggle,
    handleListItemButtonClick,
    theme,
    open,
    mobileCheck,
  } = useSideMenuLogic();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ["& .MuiDrawer-paper"]: {
          left: 0,
          top: mobileCheck ? 64 : 57,
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
        },
      }}
    >
      <Box
        className={scss.drawerHeader}
        sx={
          open ? { justifyContent: "flex-end" } : { justifyContent: "center" }
        }
      >
        <IconButton onClick={handleDrawerToggle}>
          {open ? <FirstPageIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <Divider />
      <List>
        {menulistTranslations.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: "block" }}>
            <NextLink
              className={scss.link}
              href={`/catalog/${menuRouteList[index]}`}
            >
              <ListItemButton
                onClick={() => handleListItemButtonClick(text)}
                title={text}
                aria-label={text}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: "initial",
                      }
                    : {
                        justifyContent: "center",
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: "center",
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: "auto",
                        },
                  ]}
                >
                  {menuListIcons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={<b>{text}</b>}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                    { color: theme.palette.text.primary },
                  ]}
                />
              </ListItemButton>
            </NextLink>
          </ListItem>
        ))}
      </List>
      <div className={scss.drawerSwitch}>
        <ThemeToggleSwitch />
      </div>
    </Drawer>
  );
};

export default SideMenu;
