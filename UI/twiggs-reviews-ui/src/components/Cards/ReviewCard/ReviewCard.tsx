import { IReviewContent } from "@/pages/catalog/Types";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Clear from "@mui/icons-material/Clear";
import NextLink from "next/link";
import { useTheme } from "@mui/material/styles";
import scss from "./ReviewCard.module.scss";
import React, { FC, useState } from "react";
import { useSession } from "next-auth/react";
import useReviewCardLogic from "./useReviewCardLogic";

export type ReviewCardProps = {
  review?: IReviewContent;
};

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  // const { data: session } = useSession();
  // const theme = useTheme();
  // const [mouseHover, setMouseHover] = useState(false);
  // const reviewInfo = review?.reviewContent.generalInfo;
  // const profileImg = session?.user?.image as string;

  // const handleDeleteClick = async (id: number | undefined) => {
  //   const response = await fetch(
  //     `http://localhost:8080/catalog/review/delete/${id}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  //   const data = await response.json();
  //   console.log("review id: ", id);
  //   console.log("Review Delete response: ", data);
  // };

  const {
    session,
    theme,
    mouseHover,
    reviewInfo,
    profileImg,
    setMouseHover,
    handleDeleteClick,
  } = useReviewCardLogic(review);

  return (
    <Grid
      container
      columns={12}
      className={scss.card_container}
      sx={{
        backgroundColor: theme.palette.info.main,
        borderColor: theme.palette.info.contrastText,
        boxShadow: `5px 6px 7px ${theme.palette.info.contrastText}`,
      }}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      <Grid
        display="flex"
        size={{ xs: 4, sm: 2, md: 1 }}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Button>
          <img className={scss.card_img} src={profileImg} alt="Media Image" />
        </Button>
      </Grid>
      <Grid size={{ xs: 8, sm: 10, md: 11 }} className={scss.card_info}>
        <Box className={scss.card_header}>
          <NextLink className={scss.card_title} href={"google.com"}>
            <Typography
              variant="inherit"
              sx={{ color: theme.palette.text.primary }}
            >
              <b>{reviewInfo?.mediaName}</b>
            </Typography>
          </NextLink>
          <div className={scss.card_sub}>
            <Typography variant="inherit">{reviewInfo?.mediaType}</Typography>
            {mouseHover && (
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(review?.reviewContent.id)}
                  sx={{
                    marginLeft: "auto",
                    ["&:hover"]: {
                      background: "none",
                    },
                  }}
                >
                  <Clear fontSize="inherit" />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Box>
        <div className={scss.card_text}>
          <Typography
            component="p"
            variant="inherit"
            sx={{
              borderBottom: "2px solid",
              borderColor: theme.palette.info.contrastText,
            }}
          >
            {reviewInfo?.genre.map((val: string, index) =>
              index == reviewInfo.genre.length - 1 ? val : val + " - "
            )}
          </Typography>
          <Typography
            sx={{ marginTop: "0.5rem", fontSize: "1rem" }}
            variant="inherit"
          >
            {review?.reviewContent.body}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default ReviewCard;
