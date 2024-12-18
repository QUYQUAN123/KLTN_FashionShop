import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { notify } from "../../utils/helpers/notify";
import { deleteReview, updateReview } from "../../utils/api/review";

function Review({ item, canUpdate, canDelete, bgColor }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [contentUpdate, setContentUpdate] = useState(item?.review);

  const handleUpdate = async () => {
    if (isUpdating === false) {
      setIsUpdating(true);
    } else {
      try {
        if (!contentUpdate) return notify("warn", "Bạn chưa review");
        await updateReview(item?._id, { review: contentUpdate });
        notify("success", "Review thành công");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRemove = async () => {
    try {
      const userConfirmed = window.confirm(
        "Bạn có chắc chắn muốn xóa nội dung này?"
      );
      if (userConfirmed) {
        await deleteReview(item?._id);
        notify("success", "Xóa review thành công");
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Box display="flex" gap={0.5} alignItems={"flex-end"}>
          <Box
            width={40}
            height={40}
            bgcolor={bgColor}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"50%"}
            color={"white"}
            fontSize={18}
            fontWeight={500}
          >
            {item?.user?.username?.charAt(0).toUpperCase()}
          </Box>
          <Stack>
            <Typography fontWeight={500} fontSize={14}>
              {item?.user?.username}
            </Typography>
            <Typography fontSize={12}>
              {moment(item?.createdAt).format("DD/MM/YYYY - HH:mm:ss")}
            </Typography>
          </Stack>
        </Box>
        <Box display={"flex"} gap={1}>
          {canUpdate && (
            <Button size="small" variant="outlined" onClick={handleUpdate}>
              Cập nhật
            </Button>
          )}

          {canDelete && (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={handleRemove}
            >
              Xóa
            </Button>
          )}
        </Box>
      </Box>
      <Box mt={1} pl={5}>
        {isUpdating ? (
          <TextField
            value={contentUpdate}
            onChange={(e) => setContentUpdate(e.target.value)}
            variant="standard"
            fullWidth
            multiline
          />
        ) : (
          <Typography fontSize={18}>{item?.review}</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Review;
