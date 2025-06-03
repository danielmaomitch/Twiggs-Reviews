import { IReviewContent } from "@/pages/catalog/Types";
import { useTheme } from "@mui/material";
import { useState, useCallback } from "react";

const filterReviews = (query: string, reviewList: IReviewContent[]) => {
  console.log("notquery", !query);
  if (!query) {
    return reviewList;
  }

  var filteredReviews: IReviewContent[] = reviewList.filter((review) =>
    review.reviewContent.generalInfo.mediaName
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return filteredReviews;
};

const useReviewHeaderLogic = (posts: IReviewContent[]) => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const [filteredReviews, setFilteredReviews] =
    useState<IReviewContent[]>(posts);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSearchClick = useCallback(() => {
    setFilteredReviews(filterReviews(query, posts));
  }, [query]);

  const handleResetClick = useCallback(() => {
    setQuery("");
    setFilteredReviews(filterReviews("", posts));
  }, []);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery(event.target.value);
    },
    []
  );

  const handleOpenCreateMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseCreateMenu = () => {
    setAnchorEl(null);
  };

  return {
    theme,
    query,
    filteredReviews,
    anchorEl,
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    handleOpenCreateMenu,
    handleCloseCreateMenu,
  };
};

export default useReviewHeaderLogic;
