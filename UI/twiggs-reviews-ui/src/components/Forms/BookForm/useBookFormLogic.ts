import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { useState } from "react";

const useBookFormLogic = () => {
  const [latestVolError, setLatestVolError] = useState(false);
  const [volumeRelError, setVolumeRelError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs("2002-10-28"));
  const [formData, setFormData] = useState({
    mediaName: "",
    mediaType: "Book",
    genres: "",
    author: "",
    latestVolumeRead: "",
    volumesReleased: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setLatestVolError(false);
    setVolumeRelError(false);
    setErrorMsg("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isNaN(+formData.latestVolumeRead)) {
      setLatestVolError(true);
      setErrorMsg("Only Numbers!");
      return;
    }
    if (isNaN(+formData.volumesReleased)) {
      setVolumeRelError(true);
      setErrorMsg("Only Numbers!");
      return;
    }
    console.log("Form Data and Date: ", formData, date?.format("YYYY-MM-DD"));

    const res = await fetch(`http://localhost:8080/catalog/book/create`, {
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
        latestVolumeRead: Number(formData.latestVolumeRead),
        volumesReleased: Number(formData.volumesReleased),
      }),
    });

    const data = await res.json();
    setFormData({
      mediaName: "",
      mediaType: "Book",
      genres: "",
      author: "",
      latestVolumeRead: "",
      volumesReleased: "",
    });
    console.log("Review POST response: ", data);
  };

  return {
    latestVolError,
    volumeRelError,
    errorMsg,
    date,
    formData,
    setDate,
    handleFormChange,
    handleSubmit,
  };
};

export default useBookFormLogic;
