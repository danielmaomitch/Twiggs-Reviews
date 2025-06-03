import React, { FC } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import scss from "../ContentCard.module.scss";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import { IBookContent } from "@/pages/catalog/Types";

export type BookCardProps = {
  book?: IBookContent;
};

const BookCard: FC<BookCardProps> = ({ book }) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const profileImg = session?.user?.image as string;
  let bookInfo = book?.bookContent.generalInfo;
  const bookName = bookInfo?.mediaName as string;

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
        <img className={scss.card_img} src={profileImg} alt="Book Image" />
      </Button>
      <Tooltip title={bookName}>
        <NextLink className={scss.card_title} href={"../"}>
          <Typography
            sx={{ color: theme.palette.text.primary }}
            variant="inherit"
          >
            <b>
              {bookName.length > 16
                ? bookName.substring(0, 16).concat("...")
                : bookName}
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
          {bookInfo?.genre.map((val: string, index) =>
            index == bookInfo.genre.length - 1 ? val : val + " - "
          )}
        </Typography>
        <Typography variant="inherit">
          <b>Author: </b> {book?.bookContent.author}
        </Typography>
        <Typography variant="inherit">
          <b>Latest Volume Read: </b>
          {book?.bookContent.latestVolumeRead}
        </Typography>
        <Typography variant="inherit">
          <b>Volumes Released: </b>
          {book?.bookContent.volumesReleased}
        </Typography>
        <Typography sx={{ color: "grey", marginTop: "2px" }}>
          <sub>Last Read: {bookInfo?.lastEnlightened}</sub>
        </Typography>
      </div>
    </Box>
  );
};

export default BookCard;
