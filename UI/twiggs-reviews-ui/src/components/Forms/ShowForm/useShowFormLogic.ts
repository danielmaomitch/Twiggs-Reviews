import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useState } from "react";

const useShowFormLogic = () => {
  const [seasonError, setSeasonError] = useState(false);
  const [episodeError, setEpisodeError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs("2002-10-28"));
  const [formData, setFormData] = useState({
    mediaName: "",
    mediaType: "Show",
    genres: "",
    watchedOn: "",
    season: "",
    episode: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setSeasonError(false);
    setEpisodeError(false);
    setErrorMsg("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNaN(+formData.season)) {
      setSeasonError(true);
      setErrorMsg("Only Numbers!");
      return;
    }
    if (isNaN(+formData.episode)) {
      setEpisodeError(true);
      setErrorMsg("Only Numbers!");
      return;
    }
    console.log("Form Data and Date: ", formData, date?.format("YYYY-MM-DD"));

    const res = await fetch(`http://localhost:8080/catalog/animation/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generalInfo: {
          mediaName: formData.mediaName,
          mediaType: formData.mediaType,
          genres: formData.genres.replace(/\s/g, "").split(","),
          lastEnlightened: date?.format("YYYY-MM-DD"),
        },
        watchedOn: formData.watchedOn,
        season: Number(formData.season),
        episode: Number(formData.episode),
      }),
    });

    const data = await res.json();
    setFormData({
      mediaName: "",
      mediaType: "Animation",
      genres: "",
      watchedOn: "",
      season: "",
      episode: "",
    });
    console.log("Review POST response: ", data);
  };

  return {
    seasonError,
    episodeError,
    errorMsg,
    date,
    formData,
    setDate,
    handleFormChange,
    handleSubmit,
  };
};

export default useShowFormLogic;
