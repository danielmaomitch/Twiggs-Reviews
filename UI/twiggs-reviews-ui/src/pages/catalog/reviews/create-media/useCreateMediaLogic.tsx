import { useTheme, Typography } from "@mui/material";
import { useState } from "react";
import AnimationForm from "@/components/Forms/AnimationForm";
import BookForm from "@/components/Forms/BookForm";
import ComicForm from "@/components/Forms/ComicForm";
import ShowForm from "@/components/Forms/ShowForm";
import scss from "./CreateMedia.module.scss";

const useCreateMediaLogic = () => {
  const theme = useTheme();
  const [radioValue, SetRadioValue] = useState("animation");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetRadioValue(event.target.value);
    console.log("Radio value: ", event.target.value);
  };

  const mediaForm = () => {
    switch (radioValue) {
      case "animation":
        return <AnimationForm />;
      case "book":
        return <BookForm />;
      case "comic":
        return <ComicForm />;
      case "show":
        return <ShowForm />;
      default:
        return (
          <Typography variant="inherit" className={scss.radio}>
            Invalid Media Type
          </Typography>
        );
    }
  };

  return { theme, radioValue, handleRadioChange, mediaForm };
};

export default useCreateMediaLogic;
