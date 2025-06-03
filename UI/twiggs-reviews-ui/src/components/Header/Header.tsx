import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ForestRoundedIcon from "@mui/icons-material/ForestRounded";
import { signIn, signOut } from "next-auth/react";
import NextLink from "next/link";
import useHeaderLogic from "./useHeaderLogic";
import ThemeToggleSwitch from "../ThemeToggleSwitch";

const Header = () => {
  const {
    handleOpenUserMenu,
    handleCloseUserMenu,
    theme,
    session,
    profileImg,
    anchorElUser,
    tabletCheck,
  } = useHeaderLogic();

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ForestRoundedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: 35,
            }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/catalog/reviews"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Brush Script MT",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Twiggs Reviews
          </Typography>
          <ForestRoundedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/catalog/reviews"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Brush Script MT",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Twiggs Reviews
          </Typography>
          {tabletCheck && session && (
            <Box sx={{ paddingRight: 2, marginLeft: "auto" }}>
              <Typography
                variant="inherit"
                sx={{
                  padding: 1,
                  border: "3px outset white",
                  borderRadius: "5px",
                }}
              >
                {session?.user?.name}
              </Typography>
            </Box>
          )}
          {session ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Reviews">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={session?.user?.name as string}
                    src={profileImg}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={!!anchorElUser}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <NextLink
                    href={"/catalog"}
                    style={{
                      color: theme.palette.text.primary,
                      textDecoration: "none",
                    }}
                  >
                    <Typography textAlign="center">Home</Typography>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <NextLink
                    href={"/catalog/reviews"}
                    style={{
                      color: theme.palette.text.primary,
                      textDecoration: "none",
                    }}
                  >
                    <Typography textAlign="center">My Reviews</Typography>
                  </NextLink>
                </MenuItem>
                <MenuItem onClick={() => (session ? signOut() : signIn())}>
                  <Typography sx={{ textAlign: "center" }}>
                    {session ? "Log out" : "Log in"}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ marginLeft: "auto" }}>
              <ThemeToggleSwitch />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
