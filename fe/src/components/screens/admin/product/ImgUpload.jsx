import React from "react";
import { Grid, Typography, Box, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ImgUpload({ img, setImg, handleUploadImg, index, name }) {
  return (
    <Grid item xs={2.4}>
      {img ? (
        <>
          <Typography variant="subtitle2" mb={1}>
            {name + " " + index}:
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Box
              component={"img"}
              src={img}
              width={150}
              height={150}
              sx={{
                objectFit: "cover",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />

            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => setImg("")}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          <Typography> {name + " " + index}:</Typography>
          <TextField
            type="file"
            placeholder={`Upload ảnh ${index}`}
            size="small"
            fullWidth
            onChange={handleUploadImg}
            accept="image/png, image/gif, image/jpeg"
            multiline={false}
          />
        </>
      )}
    </Grid>
  );
}

export default ImgUpload;
