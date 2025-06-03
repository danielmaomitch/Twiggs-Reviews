import { Grid, TextField, Button } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import useBookFormLogic from "./useBookFormLogic";
import scss from "../ContentForm.module.scss";

const BookForm = () => {
  const {
    latestVolError,
    volumeRelError,
    errorMsg,
    date,
    formData,
    setDate,
    handleFormChange,
    handleSubmit,
  } = useBookFormLogic();

  return (
    <div className={scss.container}>
      <Grid container justifyContent="center">
        <Grid size={{ xs: 12, sm: 8, md: 6 }}>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 600, margin: "0 auto" }}
          >
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Media Name"
                  name="mediaName"
                  value={formData.mediaName}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  disabled
                  label="Media Type"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Genre(s)"
                  name="genres"
                  value={formData.genres}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateField
                    required
                    label="Last Read"
                    name="lastEnlightened"
                    format="YYYY-MM-DD"
                    value={date}
                    onChange={(value) => setDate(value)}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  required
                  error={latestVolError}
                  label="Latest Volume Read"
                  name="latestVolumeRead"
                  helperText={errorMsg}
                  value={formData.latestVolumeRead}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <TextField
                  required
                  error={volumeRelError}
                  label="Volumes Released"
                  name="volumesReleased"
                  helperText={errorMsg}
                  value={formData.volumesReleased}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid
                container
                size={{ xs: 12 }}
                sx={{ marginTop: "2rem", justifyContent: "flex-end" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Add Media
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default BookForm;
