import { Box, Grid, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Search from "@mui/icons-material/Search";
import RestartAlt from "@mui/icons-material/RestartAlt";
import React from "react";
import useShowsLogic from "./useShowsLogic";
import { IShow, IShowContent } from "../Types";
import scss from "./Shows.module.scss";
import ShowCard from "@/components/Cards/ShowCard";

export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch("http://localhost:8080/catalog/show");
  // const dataRaw: IShow = await res.json();
  // console.log("Unmarshalled show obj: ", dataRaw);

  // var showList: IShowContent[] = [];
  // for (var show of dataRaw.data) {
  //   var cur: IShowContent = {
  //     showContent: {
  //       generalInfo: {
  //         ...show.showContent.generalInfo,
  //       },
  //       watchedOn: show.showContent.watchedOn,
  //       season: show.showContent.season,
  //       episode: show.showContent.episode,
  //     },
  //   };
  //   showList.push(cur);
  // }
  var showList: IShowContent[] = [
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
    {
      showContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Show",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        watchedOn: "Netflix",
        season: 3,
        episode: 8,
      },
    },
  ];

  return { props: { posts: showList } };
};

const Shows: React.FC = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Show posts: ", posts);

  const {
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    query,
    filteredShows,
  } = useShowsLogic(posts);

  return (
    <div className={scss.container}>
      <Box display="flex">
        <Typography variant="inherit" sx={{ fontSize: "1.5rem" }}>
          Shows
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
        {filteredShows.length === 0 ? (
          <Typography variant="inherit" color="grey" align="center">
            Sorry, No Items Match Your Search
          </Typography>
        ) : (
          filteredShows.map((show: IShowContent) => (
            <Grid size={{ xs: 2, sm: 2, md: 4, lg: 3 }}>
              <ShowCard show={show} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Shows;
