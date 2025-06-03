import {
  Typography,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import scss from "./CreateMedia.module.scss";
import React from "react";
import { notoSans } from "@/pages/_app";
import useCreateMediaLogic from "./useCreateMediaLogic";

const CreateMedia = () => {
  const { theme, radioValue, handleRadioChange, mediaForm } =
    useCreateMediaLogic();

  return (
    <div className={scss.container}>
      <Typography
        variant="inherit"
        sx={{ fontSize: "2rem", textAlign: "center" }}
      >
        Add a Media
      </Typography>
      <div className={scss.radio}>
        <FormLabel
          sx={{
            fontFamily: notoSans.style,
            paddingRight: "0.5rem",
            color: theme.palette.text.primary,
          }}
        >
          Choose a type:
        </FormLabel>
        <RadioGroup
          row
          defaultValue="animation"
          name="radio-buttons-group"
          value={radioValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="animation"
            control={<Radio disableRipple disableTouchRipple />}
            label={<Typography variant="inherit">Animation</Typography>}
          />
          <FormControlLabel
            value="book"
            control={<Radio disableRipple disableTouchRipple />}
            label={<Typography variant="inherit">Book</Typography>}
          />
          <FormControlLabel
            value="comic"
            control={<Radio disableRipple disableTouchRipple />}
            label={<Typography variant="inherit">Comic</Typography>}
          />
          <FormControlLabel
            value="show"
            control={<Radio disableRipple disableTouchRipple />}
            label={<Typography variant="inherit">Show</Typography>}
          />
        </RadioGroup>
      </div>
      {mediaForm()}
    </div>
  );
};

export default CreateMedia;
