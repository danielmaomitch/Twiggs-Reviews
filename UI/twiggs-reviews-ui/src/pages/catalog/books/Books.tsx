import { Box, Grid, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Search from "@mui/icons-material/Search";
import RestartAlt from "@mui/icons-material/RestartAlt";
import React from "react";
import useBooksLogic from "./useBooksLogic";
import { IBook, IBookContent } from "../Types";
import scss from "./Books.module.scss";
import BookCard from "@/components/Cards/BookCard";

export const getStaticProps: GetStaticProps = async () => {
  // const res = await fetch("http://localhost:8080/catalog/book");
  // const dataRaw: IBook = await res.json();
  // console.log("Unmarshalled book obj: ", dataRaw);

  // var bookList: IBookContent[] = [];
  // for (var book of dataRaw.data) {
  //   var cur: IBookContent = {
  //     bookContent: {
  //       generalInfo: {
  //         ...book.bookContent.generalInfo,
  //       },
  //       author: book.bookContent.author,
  //       latestVolumeRead: book.bookContent.latestVolumeRead,
  //       volumesReleased: book.bookContent.volumesReleased,
  //     },
  //   };
  //   bookList.push(cur);
  // }
  var bookList: IBookContent[] = [
    {
      bookContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Book",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        latestVolumeRead: 4,
        volumesReleased: 8,
      },
    },
    {
      bookContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Book",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        latestVolumeRead: 4,
        volumesReleased: 8,
      },
    },
    {
      bookContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Book",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        latestVolumeRead: 4,
        volumesReleased: 8,
      },
    },
    {
      bookContent: {
        generalInfo: {
          id: 7,
          mediaName: "Demon Slayer",
          mediaType: "Book",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        latestVolumeRead: 4,
        volumesReleased: 8,
      },
    },
    {
      bookContent: {
        generalInfo: {
          id: 7,
          mediaName: "Remon Slayer",
          mediaType: "Book",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        latestVolumeRead: 4,
        volumesReleased: 8,
      },
    },
    {
      bookContent: {
        generalInfo: {
          id: 7,
          mediaName: "Remon Slayer",
          mediaType: "Book",
          genre: ["Shounen", "Fantasy"],
          lastEnlightened: "25-05-02",
        },
        author: "Clover",
        latestVolumeRead: 4,
        volumesReleased: 8,
      },
    },
  ];

  return { props: { posts: bookList } };
};

const Books: React.FC = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log("Book posts: ", posts);

  const {
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    query,
    filteredBooks,
  } = useBooksLogic(posts);

  return (
    <div className={scss.container}>
      <Box display="flex">
        <Typography variant="inherit" sx={{ fontSize: "1.5rem" }}>
          Books
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
        {filteredBooks.length === 0 ? (
          <Typography variant="inherit" color="grey" align="center">
            Sorry, No Items Match Your Search
          </Typography>
        ) : (
          filteredBooks.map((book: IBookContent) => (
            <Grid size={{ xs: 2, sm: 2, md: 4, lg: 3 }}>
              <BookCard book={book} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Books;
