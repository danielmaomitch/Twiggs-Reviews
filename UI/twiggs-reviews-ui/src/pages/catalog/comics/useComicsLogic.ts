import { useState, useCallback } from "react";
import { IComicContent } from "../Types";

const filterComics = (query: string, comicList: IComicContent[]) => {
  if (!query) {
    return comicList;
  }

  var filteredComics: IComicContent[] = comicList.filter((comic) =>
    comic.comicContent.generalInfo.mediaName
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return filteredComics;
};

const useComicsLogic = (posts: IComicContent[]) => {
  const [query, setQuery] = useState("");
  const [filteredComics, setfilteredComics] = useState<IComicContent[]>(posts);

  const handleSearchClick = useCallback(() => {
    setfilteredComics(filterComics(query, posts));
  }, [query]);

  const handleResetClick = useCallback(() => {
    setQuery("");
    setfilteredComics(posts);
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
    filteredComics,
  };
};

export default useComicsLogic;
