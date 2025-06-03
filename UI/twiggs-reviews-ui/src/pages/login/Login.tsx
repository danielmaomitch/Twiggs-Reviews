import { Button, Divider, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import About from "./About";
import scss from "./Login.module.scss";
import Box from "@mui/material/Box";
import { signIn } from "next-auth/react";

export const Login = () => {
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      className={scss.container}
      divider={<Divider variant="middle" orientation="vertical" flexItem />}
      spacing={2}
    >
      <Typography
        variant="inherit"
        sx={{ width: "50%", textAlign: "center", fontSize: "1.2rem" }}
      >
        <About />
      </Typography>
      <Box display="flex" flexDirection="column">
        <h1>Sign in with Google</h1>
        <Button
          variant="contained"
          sx={{ marginBottom: "3rem" }}
          onClick={() => signIn()}
        >
          <b>Sign In</b>
        </Button>
      </Box>
    </Stack>
  );
};

export default Login;
