import {
  Box,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Search from "@mui/icons-material/Search";
import RestartAlt from "@mui/icons-material/RestartAlt";
import Add from "@mui/icons-material/Add";
import React, { useState } from "react";
import useSearchLogic from "./useReviewsLogic";
import { IReview, IReviewContent } from "../Types";
import ReviewCard from "@/components/Cards/ReviewCard";
import NextLink from "next/link";
import scss from "./Reviews.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8080/catalog/review");
  const dataRaw: IReview = await res.json();
  console.log("Unmarshalled review obj: ", dataRaw);

  var reviewList: IReviewContent[] = [];
  for (var review of dataRaw.data) {
    var cur: IReviewContent = {
      reviewContent: {
        generalInfo: {
          ...review.reviewContent.generalInfo,
        },
        id: review.reviewContent.id,
        body: review.reviewContent.body,
      },
    };
    reviewList.push(cur);
  }
  // var reviewList: IReviewContent[] = [
  //   {
  //     reviewContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Demon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       id: 4,
  //       body: "The transgressions of man knows no bounds and shall endlessly consume the good will of the Lord and all his creations.",
  //     },
  //   },
  //   {
  //     reviewContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Remon Slayer",
  //         mediaType: "Manga",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       id: 5,
  //       body: "The transgressions of man knows no bounds and shall endlessly consume the good will of the Lord and all his creations.",
  //     },
  //   },
  //   {
  //     reviewContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Demon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       id: 4,
  //       body: "The transgressions of man knows no bounds and shall endlessly consume the good will of the Lord and all his creations.",
  //     },
  //   },
  //   {
  //     reviewContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Remon Slayer",
  //         mediaType: "Manga",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       id: 5,
  //       body: "The transgressions of man knows no bounds and shall endlessly consume the good will of the Lord and all his creations.",
  //     },
  //   },
  //   {
  //     reviewContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Demon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       id: 4,
  //       body: "The transgressions of man knows no bounds and shall endlessly consume the good will of the Lord and all his creations.",
  //     },
  //   },
  //   {
  //     reviewContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Remon Slayer",
  //         mediaType: "Manga",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       id: 5,
  //       body: "The transgressions of man knows no bounds and shall endlessly consume the good will of the Lord and all his creations.",
  //     },
  //   },
  // ];

  return { props: { posts: reviewList } };
};

const Reviews: React.FC = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Review posts: ", posts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenCreateMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseCreateMenu = () => {
    setAnchorEl(null);
  };
  const {
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    theme,
    query,
    filteredReviews,
  } = useSearchLogic(posts);

  return (
    <div className={scss.container}>
      <Box display="flex" position="static">
        <Typography variant="inherit" sx={{ fontSize: "1.5rem" }}>
          Reviews
        </Typography>
        <Tooltip title="Search">
          <IconButton
            disableRipple
            onClick={handleSearchClick}
            sx={{
              marginLeft: "auto",
              ["&:hover"]: {
                background: "none",
              },
            }}
          >
            <Search />
          </IconButton>
        </Tooltip>
        <TextField
          sx={{
            display: "flex",
            width: "40%",
            ["& .MuiOutlinedInput-root"]: {
              "& fieldset": {
                border: "2px solid grey",
                borderRadius: "50px",
              },
            },
          }}
          size="small"
          onChange={handleQueryChange}
          placeholder="Search..."
          value={query}
        />
        <Tooltip title="Reset">
          <IconButton
            disableRipple
            onClick={handleResetClick}
            sx={{
              marginRight: "auto",
              ["&:hover"]: {
                background: "none",
              },
            }}
          >
            <RestartAlt />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create">
          <IconButton disableRipple onClick={handleOpenCreateMenu}>
            <Add />
          </IconButton>
        </Tooltip>
        <Menu
          id="create-button"
          keepMounted
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ mt: "2rem" }}
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleCloseCreateMenu}
        >
          <MenuItem>
            <NextLink
              href={"reviews/create"}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              <Typography textAlign="center">Create Review</Typography>
            </NextLink>
          </MenuItem>
          <MenuItem>
            <NextLink
              href={"reviews/create-media"}
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              <Typography textAlign="center">Create Media</Typography>
            </NextLink>
          </MenuItem>
        </Menu>
      </Box>
      <Grid container className={scss.card_grid} rowSpacing={5} columns={1}>
        {query === "0" ? (
          <Typography variant="inherit" color="grey" align="center">
            Sorry, No Items Match Your Search
          </Typography>
        ) : (
          filteredReviews.map((review: IReviewContent) => (
            <Grid size={1} sx={{ justifyItems: "center" }}>
              <ReviewCard review={review} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Reviews;
