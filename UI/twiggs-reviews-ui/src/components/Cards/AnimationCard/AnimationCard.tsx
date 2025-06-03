import React, { FC } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import scss from "../ContentCard.module.scss";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import { IAnimeContent } from "@/pages/catalog/Types";

export type AnimationCardProps = {
  anime?: IAnimeContent;
};

const AnimationCard: FC<AnimationCardProps> = ({ anime }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const profileImg = session?.user?.image as string;
  let animeInfo = anime?.animeContent.generalInfo;
  const animeName = animeInfo?.mediaName as string;

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
        <img className={scss.card_img} src={profileImg} alt="Anime Image" />
      </Button>
      <Tooltip title={animeName}>
        <NextLink className={scss.card_title} href={"../"}>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            variant="inherit"
          >
            <b>
              {animeName.length > 16
                ? animeName.substring(0, 16).concat("...")
                : animeName}
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
          {animeInfo?.genre.map((val: string, index) =>
            index == animeInfo.genre.length - 1 ? val : val + " - "
          )}
        </Typography>
        <Typography variant="inherit">
          <b>Studio: </b> {anime?.animeContent.studio}
        </Typography>
        <Typography variant="inherit">
          <b>Status: </b>
          {anime?.animeContent.season} - {anime?.animeContent.episode}
        </Typography>
        <Typography sx={{ color: "grey", marginTop: "2px" }}>
          <sub>Last Watched: {animeInfo?.lastEnlightened}</sub>
        </Typography>
      </div>
    </Box>
  );
};

export default AnimationCard;
