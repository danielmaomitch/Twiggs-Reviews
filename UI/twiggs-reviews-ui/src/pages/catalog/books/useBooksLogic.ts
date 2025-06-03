import { useState, useCallback } from "react";
import { IBookContent } from "../Types";

const filterBooks = (query: string, bookList: IBookContent[]) => {
  if (!query) {
    return bookList;
  }

  var filteredBooks: IBookContent[] = bookList.filter((book) =>
    book.bookContent.generalInfo.mediaName
      .toLowerCase()
      .includes(query.toLowerCase())
  );
  return filteredBooks;
};

const useBooksLogic = (posts: IBookContent[]) => {
  const [query, setQuery] = useState("");
  const [filteredBooks, setfilteredBooks] = useState<IBookContent[]>(posts);

  const handleSearchClick = useCallback(() => {
    setfilteredBooks(filterBooks(query, posts));
  }, [query]);

  const handleResetClick = useCallback(() => {
    setQuery("");
    setfilteredBooks(posts);
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
    filteredBooks,
  };
};

export default useBooksLogic;
