import AnimationCard from "@/components/Cards/AnimationCard";
import { Box, Grid, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Search from "@mui/icons-material/Search";
import RestartAlt from "@mui/icons-material/RestartAlt";
import React from "react";
import useAnimationsLogic from "./useAnimationsLogic";
import { IAnimation, IAnimeContent } from "../Types";
import scss from "./Animations.module.scss";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:8080/catalog/animation");
  const dataRaw: IAnimation = await res.json();
  console.log("Unmarshalled anime obj: ", dataRaw);

  var animeList: IAnimeContent[] = [];
  for (var anime of dataRaw.data) {
    var cur: IAnimeContent = {
      animeContent: {
        generalInfo: {
          ...anime.animeContent.generalInfo,
        },
        studio: anime.animeContent.studio,
        season: anime.animeContent.season,
        episode: anime.animeContent.episode,
      },
    };
    animeList.push(cur);
  }
  // var animeList: IAnimeContent[] = [
  //   {
  //     animeContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Demon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       studio: "Clover",
  //       season: 3,
  //       episode: 12,
  //     },
  //   },
  //   {
  //     animeContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Demon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       studio: "Clover",
  //       season: 3,
  //       episode: 12,
  //     },
  //   },
  //   {
  //     animeContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Remon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       studio: "Clover",
  //       season: 3,
  //       episode: 12,
  //     },
  //   },
  //   {
  //     animeContent: {
  //       generalInfo: {
  //         id: 7,
  //         mediaName: "Remon Slayer",
  //         mediaType: "Animation",
  //         genre: ["Shounen", "Fantasy"],
  //         lastEnlightened: "25-05-02",
  //       },
  //       studio: "Clover",
  //       season: 3,
  //       episode: 12,
  //     },
  //   },
  // ];

  return { props: { posts: animeList } };
};

const Animations: React.FC = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Anime posts: ", posts);

  const {
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    query,
    filteredAnimes,
  } = useAnimationsLogic(posts);

  return (
    <div className={scss.container}>
      <Box display="flex">
        <Typography variant="inherit" sx={{ fontSize: "1.5rem" }}>
          Animations
        </Typography>
        <IconButton
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
        <IconButton
          onClick={handleResetClick}
          sx={{
            marginLeft: "auto",
            marginRight: "1rem",
            ["&:hover"]: {
              background: "none",
            },
          }}
        >
          <RestartAlt />
        </IconButton>
      </Box>
      <Grid
        container
        className={scss.card_grid}
        rowSpacing={3}
        columns={{ xs: 2, sm: 4, md: 12, lg: 12 }}
      >
        {filteredAnimes.length === 0 ? (
          <Typography variant="inherit" color="grey" align="center">
            Sorry, No Items Match Your Search
          </Typography>
        ) : (
          filteredAnimes.map((anime: IAnimeContent) => (
            <Grid size={{ xs: 2, sm: 2, md: 4, lg: 3 }}>
              <AnimationCard anime={anime} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Animations;
