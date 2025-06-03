import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useState } from "react";

const useComicFormLogic = () => {
  const [chaptersReadError, setChaptersReadError] = useState(false);
  const [chaptersRelError, setChaptersRelError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs("2002-10-28"));
  const [formData, setFormData] = useState({
    mediaName: "",
    mediaType: "Comic",
    genres: "",
    author: "",
    chaptersRead: "",
    chaptersReleased: "",
    oneshot: false,
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "oneshot" ? checked : value,
    }));
    setChaptersReadError(false);
    setChaptersRelError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNaN(+formData.chaptersRead)) {
      setChaptersReadError(true);
      setErrorMsg("Only Numbers!");
      return;
    }
    if (isNaN(+formData.chaptersReleased)) {
      setChaptersRelError(true);
      setErrorMsg("Only Numbers!");
      return;
    }
    console.log("Form Data and Date: ", formData, date?.format("YYYY-MM-DD"));

    const res = await fetch(`http://localhost:8080/catalog/comic/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generalInfo: {
          mediaName: formData.mediaName,
          mediaType: formData.mediaType,
          genres: formData.genres.replace(/\s/g, "").split(","),
          lastEnlightened: date?.format("YYYY-MM-DD"),
        },
        author: formData.author,
        chaptersRead: Number(formData.chaptersRead),
        chaptersReleased: Number(formData.chaptersReleased),
        oneshot: formData.oneshot,
      }),
    });

    const data = await res.json();
    setFormData({
      mediaName: "",
      mediaType: "Book",
      genres: "",
      author: "",
      chaptersRead: "",
      chaptersReleased: "",
      oneshot: false,
    });
    console.log("Review POST response: ", data);
  };

  return {
    chaptersReadError,
    chaptersRelError,
    errorMsg,
    date,
    formData,
    setDate,
    handleFormChange,
    handleSubmit,
  };
};

export default useComicFormLogic;
