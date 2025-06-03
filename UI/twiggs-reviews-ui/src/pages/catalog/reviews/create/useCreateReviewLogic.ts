import { useState } from "react";

const useCreateReviewLogic = () => {
  const mediaTypes = ["Anime", "Book", "Comic", "Show"];
  const [formData, setFormData] = useState({
    mediaName: "",
    mediaType: mediaTypes[0],
    body: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);

    const res = await fetch(`http://localhost:8080/catalog/review/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        generalInfo: {
          mediaName: formData.mediaName,
          mediaType: formData.mediaType,
        },
        body: formData.body,
      }),
    });

    const data = await res.json();
    setFormData({
      mediaName: "",
      mediaType: mediaTypes[0],
      body: "",
    });
    console.log("Review POST response: ", data);
  };

  return { mediaTypes, formData, handleFormChange, handleSubmit };
};

export default useCreateReviewLogic;
