import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Search, RestartAlt, Add } from "@mui/icons-material";
import NextLink from "next/link";
import useReviewHeaderLogic from "./useReviewHeaderLogic";
import React, { FC } from "react";
import { IReviewContent } from "@/pages/catalog/Types";

export type ReviewHeaderProps = {
  posts?: IReviewContent[];
};

const ReviewHeader: FC<ReviewHeaderProps> = ({ posts }) => {
  const {
    theme,
    query,
    filteredReviews,
    anchorEl,
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    handleOpenCreateMenu,
    handleCloseCreateMenu,
  } = useReviewHeaderLogic(posts as IReviewContent[]);

  return (
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
  );
};

export default ReviewHeader;
