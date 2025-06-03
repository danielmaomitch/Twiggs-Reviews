import { useState, useCallback } from "react";
import { IAnimeContent } from "../Types";

const filterAnimes = (query: string, animeList: IAnimeContent[]) => {
  if (!query) {
    return animeList;
  }

  var filteredAnimes: IAnimeContent[] = animeList.filter((anime) =>
    anime.animeContent.generalInfo.mediaName
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return filteredAnimes;
};

const useAnimationsLogic = (posts: IAnimeContent[]) => {
  const [query, setQuery] = useState("");
  const [filteredAnimes, setFilteredAnimes] = useState<IAnimeContent[]>(posts);

  const handleSearchClick = useCallback(() => {
    setFilteredAnimes(filterAnimes(query, posts));
  }, [query]);

  const handleResetClick = useCallback(() => {
    setQuery("");
    setFilteredAnimes(posts);
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
    filteredAnimes,
  };
};

export default useAnimationsLogic;
