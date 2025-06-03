import { ColorModeContext } from "@/pages/_app";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useCallback } from "react";

const useThemeToggleSwitchLogic = () => {
  const [mode, setMode] = React.useState(true);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const handleModeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("switchlogic event.target.checked: ", event.target.checked);
      setMode(event.target.checked);
    },
    []
  );

  return { mode, theme, colorMode, handleModeChange };
};

export default useThemeToggleSwitchLogic;
