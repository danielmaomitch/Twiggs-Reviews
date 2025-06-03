import React, { FC } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import scss from "../ContentCard.module.scss";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import { IComic, IComicContent } from "@/pages/catalog/Types";

export type ComicCardProps = {
  comic?: IComicContent;
};

const ComicCard: FC<ComicCardProps> = ({ comic }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const profileImg = session?.user?.image as string;
  let comicInfo = comic?.comicContent.generalInfo;
  const comicName = comicInfo?.mediaName as string;

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
        <img className={scss.card_img} src={profileImg} alt="Comic Image" />
      </Button>
      <Tooltip title={comicName}>
        <NextLink className={scss.card_title} href={"../"}>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            variant="inherit"
          >
            <b>
              {comicName.length > 16
                ? comicName.substring(0, 16).concat("...")
                : comicName}
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
          {comicInfo?.genre.map((val: string, index) =>
            index == comicInfo.genre.length - 1 ? val : val + " - "
          )}
        </Typography>
        <Typography variant="inherit">
          <b>Author: </b> {comic?.comicContent.author}
        </Typography>
        <Typography variant="inherit">
          <b>Chapters Read: </b>
          {comic?.comicContent.chaptersRead}
        </Typography>
        <Typography variant="inherit">
          <b>Chapters Released: </b>
          {comic?.comicContent.chaptersReleased}
        </Typography>
        <Typography variant="inherit">
          <b>Oneshot: </b>
          {comic?.comicContent.oneshot ? "Yes" : "No"}
        </Typography>
        <Typography sx={{ color: "grey", marginTop: "2px" }}>
          <sub>Last Read: {comicInfo?.lastEnlightened}</sub>
        </Typography>
      </div>
    </Box>
  );
};

export default ComicCard;
