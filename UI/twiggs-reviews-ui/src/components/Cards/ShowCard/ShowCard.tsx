import React, { FC } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import scss from "../ContentCard.module.scss";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import { IShowContent } from "@/pages/catalog/Types";

export type ShowCardProps = {
  show?: IShowContent;
};

const ShowCard: FC<ShowCardProps> = ({ show }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const profileImg = session?.user?.image as string;
  let showInfo = show?.showContent.generalInfo;
  const showName = showInfo?.mediaName as string;

  return (
    <Box
      className={scss.card_container}
      sx={{
        backgroundColor: theme.palette.info.main,
        borderColor: theme.palette.info.contrastText,
        boxShadow: `5px 6px 7px ${theme.palette.info.contrastText}`,
      }}
    >
      <Button>
        <img className={scss.card_img} src={profileImg} alt="Show Image" />
      </Button>
      <Tooltip title={showName}>
        <NextLink className={scss.card_title} href={"../"}>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            variant="inherit"
          >
            <b>
              {showName.length > 16
                ? showName.substring(0, 16).concat("...")
                : showName}
            </b>
          </Typography>
        </NextLink>
      </Tooltip>
      <div className={scss.card_text}>
        <Typography
          component="p"
          variant="inherit"
          sx={{
            borderBottom: "2px solid",
            borderColor: theme.palette.info.contrastText,
          }}
        >
          {showInfo?.genre.map((val: string, index) =>
            index == showInfo.genre.length - 1 ? val : val + " - "
          )}
        </Typography>
        <Typography variant="inherit">
          <b>Watched On: </b> {show?.showContent.watchedOn}
        </Typography>
        <Typography variant="inherit">
          <b>Season: </b>
          {show?.showContent.season}
        </Typography>
        <Typography variant="inherit">
          <b>Episode: </b>
          {show?.showContent.episode}
        </Typography>
        <Typography sx={{ color: "grey", marginTop: "2px" }}>
          <sub>Last Read: {showInfo?.lastEnlightened}</sub>
        </Typography>
      </div>
    </Box>
  );
};

export default ShowCard;
