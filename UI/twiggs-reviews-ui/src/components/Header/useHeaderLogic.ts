import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import React, { useCallback } from "react";

const useHeaderLogic = () => {
  const theme = useTheme();
  const { data: session } = useSession();
  const profileImg = session?.user?.image as string;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const tabletCheck = useMediaQuery("(min-width: 768px)");

  const handleOpenUserMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    },
    []
  );

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null);
  }, []);

  return {
    handleOpenUserMenu,
    handleCloseUserMenu,
    theme,
    session,
    profileImg,
    anchorElUser,
    tabletCheck,
  };
};

export default useHeaderLogic;
