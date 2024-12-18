import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LeftProduct from "../components/screens/product/LeftProduct";
import RightProduct from "../components/screens/product/RightProduct";
import ProductCard from "../components/common/ProductCard";
import { useParams } from "react-router-dom";
import { getProductById, listRelatedVideo } from "../utils/api/product";
import Review from "../components/common/Review";
import { findByProductId } from "../utils/api/review";
import { useSelector } from "react-redux";
import { getRandomGoogleColor } from "../utils/helpers/randomColor";

function Product() {
  const { id } = useParams();

  const user = useSelector((state) => state?.user?.user);

  const [data, setData] = useState({});
  const [arrRelatedVideo, setArrRelatedVideo] = useState([]);
  const [listReview, setListReview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          getProductById(id).then((res) => {
            setData(res?.data);
          }),
          listRelatedVideo(id).then((res) => {
            setArrRelatedVideo(res?.data);
          }),
          findByProductId(id).then((res) => {
            setListReview(res?.data);
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    fetchData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  return (
    <MainLayout>
      <Container>
        <Stack py={"20px"} gap={"40px"}>
          {loading ? (
            <Box
              height={"70vh"}
              width={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress color="error" />
            </Box>
          ) : (
            <Box>
              <Paper elevation={3}>
                <Box
                  paddingX={"10px"}
                  paddingTop={"10px"}
                  paddingBottom={"40px"}
                >
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={5}>
                      <LeftProduct
                        data={[
                          data?.img1,
                          data?.img2,
                          data?.img3,
                          data?.img4,
                          data?.img5,
                          data?.img6,
                          data?.img7,
                          data?.img8,
                          data?.img9,
                          data?.img10,
                          data?.firstTypeUrl1,
                          data?.firstTypeUrl2,
                          data?.firstTypeUrl3,
                          data?.firstTypeUrl4,
                          data?.firstTypeUrl5,
                          data?.firstTypeUrl6,
                          data?.firstTypeUrl7,
                          data?.firstTypeUrl8,
                          data?.firstTypeUrl9,
                          data?.firstTypeUrl10,
                          data?.secondTypeUrl1,
                          data?.secondTypeUrl2,
                          data?.secondTypeUrl3,
                          data?.secondTypeUrl4,
                          data?.secondTypeUrl5,
                          data?.secondTypeUrl6,
                          data?.secondTypeUrl7,
                          data?.secondTypeUrl8,
                          data?.secondTypeUrl9,
                          data?.secondTypeUrl10,
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                      <RightProduct info={data} />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              <Paper elevation={3}>
                <Box padding={"10px"} mt={1}>
                  <Typography fontSize={20} color={"#dd3333"} fontWeight={600}>
                    REVIEW SẢN PHẨM
                  </Typography>
                  <Stack mt={"20px"} gap={2} pl={1}>
                    {listReview?.map((r) => (
                      <Review
                        item={r}
                        key={r?._id}
                        bgColor={getRandomGoogleColor()}
                        canUpdate={r?.user?._id == user?._id}
                        canDelete={r?.user?._id == user?._id || user?.role == 1}
                      />
                    ))}
                  </Stack>
                </Box>
              </Paper>
              <Paper elevation={3}>
                <Box padding={"10px"} mt={1}>
                  <Typography fontSize={20} color={"#dd3333"} fontWeight={600}>
                    SẢN PHẨM TƯƠNG TỰ
                  </Typography>
                  <Box mt={"20px"}>
                    <Grid container spacing={2}>
                      {arrRelatedVideo.map((e) => (
                        <Grid item xs={6} md={2} key={e?._id}>
                          <ProductCard item={e} />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Paper>
            </Box>
          )}
        </Stack>
      </Container>
    </MainLayout>
  );
}

export default Product;
