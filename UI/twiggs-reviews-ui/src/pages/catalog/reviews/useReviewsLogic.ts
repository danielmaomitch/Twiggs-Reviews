import { useState, useCallback } from "react";
import { IReviewContent } from "../Types";
import { useTheme } from "@mui/material/styles";

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

const useReviewsLogic = (posts: IReviewContent[]) => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const [filteredReviews, setFilteredReviews] =
    useState<IReviewContent[]>(posts);
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

  return {
    handleResetClick,
    handleSearchClick,
    handleQueryChange,
    theme,
    query,
    filteredReviews,
  };
};

export default useReviewsLogic;
