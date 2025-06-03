import { Box, Grid, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Search from "@mui/icons-material/Search";
import RestartAlt from "@mui/icons-material/RestartAlt";
import React from "react";
import useComicsLogic from "./useComicsLogic";
import { IComic, IComicContent } from "../Types";
import scss from "./Comics.module.scss";
import ComicCard from "@/components/Cards/ComicCard";

export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch("http://localhost:8080/catalog/comic");
  // const dataRaw: IComic = await res.json();
  // console.log("Unmarshalled comic obj: ", dataRaw);

  // var comicList: IComicContent[] = [];
  // for (var comic of dataRaw.data) {
  //   var cur: IComicContent = {
  //     comicContent: {
  //       generalInfo: {
  //         ...comic.comicContent.generalInfo,
  //       },
  //       author: comic.comicContent.author,
  //       chaptersRead: comic.comicContent.chaptersRead,
  //       chaptersReleased: comic.comicContent.chaptersReleased,
  //       oneshot: comic.comicContent.oneshot,
  //     },
  //   };
  //   comicList.push(cur);
  // }
  var comicList: IComicContent[] = [
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: false,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: true,
      },
    },
    {
      comicContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Comic",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        chaptersRead: 4,
        chaptersReleased: 8,
        oneshot: false,
      },
    },
  ];

  return { props: { posts: comicList } };
};

const Comics: React.FC = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Comic posts: ", posts);

  const {
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    query,
    filteredComics,
  } = useComicsLogic(posts);

  return (
    <div className={scss.container}>
      <Box display="flex">
        <Typography variant="inherit" sx={{ fontSize: "1.5rem" }}>
          Comics
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
        {filteredComics.length === 0 ? (
          <Typography variant="inherit" color="grey" align="center">
            Sorry, No Items Match Your Search
          </Typography>
        ) : (
          filteredComics.map((comic: IComicContent) => (
            <Grid size={{ xs: 2, sm: 2, md: 4, lg: 3 }}>
              <ComicCard comic={comic} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Comics;
