import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { signOut } from "next-auth/react";
import { useState, useCallback } from "react";

const useSideMenuLogic = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const mobileCheck = useMediaQuery("(min-width: 600px)");

  const handleDrawerToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleListItemButtonClick = useCallback((text: string) => {
    text === "Sign Out" ? signOut() : null;
    setOpen(false);
  }, []);

  return {
    handleDrawerToggle,
    handleListItemButtonClick,
    theme,
    open,
    mobileCheck,
  };
};

export default useSideMenuLogic;
