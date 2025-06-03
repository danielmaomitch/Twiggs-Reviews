import { useState, useCallback } from "react";
import { IShowContent } from "../Types";

const filterShows = (query: string, showList: IShowContent[]) => {
  if (!query) {
    return showList;
  }

  var filteredShows: IShowContent[] = showList.filter((show) =>
    show.showContent.generalInfo.mediaName
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return filteredShows;
};

const useShowsLogic = (posts: IShowContent[]) => {
  const [query, setQuery] = useState("");
  const [filteredShows, setfilteredShows] = useState<IShowContent[]>(posts);

  const handleSearchClick = useCallback(() => {
    setfilteredShows(filterShows(query, posts));
  }, [query]);

  const handleResetClick = useCallback(() => {
    setQuery("");
    setfilteredShows(posts);
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
    query,
    filteredShows,
  };
};

export default useShowsLogic;
