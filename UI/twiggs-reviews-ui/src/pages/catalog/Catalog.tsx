import { Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import NextLink from "next/link";
import DrawIcon from "@mui/icons-material/Draw";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsIcon from "@mui/icons-material/Collections";
import FeedIcon from "@mui/icons-material/Feed";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import scss from "./Catalog.module.scss";
import { signOut } from "next-auth/react";

const Catalog = () => {
  const theme = useTheme();
  const panelRouteList = ["animations", "books", "comics", "shows"];
  const panelHeaderList = ["Animations", "Books", "Comics", "Shows"];
  const menuListIcons = [
    <DrawIcon />,
    <MenuBookIcon />,
    <CollectionsIcon />,
    <VideoCameraBackIcon />,
  ];
  return (
    <div className={scss.container}>
      <div className={scss.header}>
        <Typography variant="inherit">
          Welcome to Twiggs Reviews, <br />
          Pick A Page To Get Started
        </Typography>
      </div>
      <Grid container spacing={2} columnSpacing={0}>
        <Grid size={12}>
          <Box
            className={scss.panel}
            sx={{
              backgroundColor: theme.palette.info.main,
              borderColor: theme.palette.info.contrastText,
              boxShadow: `5px 6px 7px ${theme.palette.info.contrastText}`,
            }}
          >
            <div className={scss.panel_text}>
              <div className={scss.panel_sub}>
                <FeedIcon />
                <NextLink className={scss.link} href="/catalog/reviews">
                  <Typography
                    variant="inherit"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    My Reviews
                  </Typography>
                </NextLink>
              </div>
              <Typography variant="inherit">
                A collection of your reviews
              </Typography>
            </div>
          </Box>
        </Grid>
        {panelRouteList.map((page: string, index) => (
          <Grid size={12}>
            <Box
              className={scss.panel}
              sx={{
                backgroundColor: theme.palette.info.main,
                borderColor: theme.palette.info.contrastText,
                boxShadow: `5px 6px 7px ${theme.palette.info.contrastText}`,
              }}
            >
              <div className={scss.panel_text}>
                <div className={scss.panel_sub}>
                  {menuListIcons[index]}
                  <NextLink className={scss.link} href={`/catalog/${page}`}>
                    <Typography
                      variant="inherit"
                      sx={{ color: theme.palette.text.primary }}
                    >
                      My {panelHeaderList[index]}
                    </Typography>
                  </NextLink>
                </div>
                <Typography variant="inherit">
                  A collection of your {page}
                </Typography>
              </div>
            </Box>
          </Grid>
        ))}
        <Grid size={12}>
          <Box
            className={scss.panel}
            sx={{
              backgroundColor: theme.palette.info.main,
              borderColor: theme.palette.info.contrastText,
              boxShadow: `5px 6px 7px ${theme.palette.info.contrastText}`,
            }}
          >
            <div className={scss.panel_text}>
              <div className={scss.panel_sub}>
                <LogoutIcon />
                <NextLink
                  className={scss.link}
                  href="/"
                  onClick={() => signOut()}
                >
                  <Typography
                    variant="inherit"
                    sx={{ color: theme.palette.text.primary }}
                  >
                    Sign Out
                  </Typography>
                </NextLink>
              </div>
              <Typography variant="inherit">Sign Out</Typography>
            </div>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;
