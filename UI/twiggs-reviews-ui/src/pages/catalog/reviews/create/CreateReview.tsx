import { Grid, TextField, Button, Typography, MenuItem } from "@mui/material";
import scss from "./CreateReview.module.scss";
import React from "react";
import useCreateReviewLogic from "./useCreateReviewLogic";

const CreateReivew = () => {
  const { mediaTypes, formData, handleFormChange, handleSubmit } =
    useCreateReviewLogic();

  return (
    <div className={scss.container}>
      <Typography
        variant="inherit"
        sx={{ paddingBottom: 4, fontSize: "2rem", textAlign: "center" }}
      >
        Add a Review
      </Typography>
      <Grid container>
        <Grid size={{ xs: 12 }}>
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
                  select
                  label="Media Type"
                  name="mediaType"
                  value={formData.mediaType}
                  onChange={handleFormChange}
                >
                  {mediaTypes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  multiline
                  maxRows={4}
                  label="Review"
                  name="body"
                  value={formData.body}
                  onChange={handleFormChange}
                />
              </Grid>
              <Grid
                container
                size={{ xs: 12 }}
                sx={{ marginTop: "2rem", justifyContent: "flex-end" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Add Review
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateReivew;
