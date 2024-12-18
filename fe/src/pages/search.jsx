import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import BreadCrumb from "../components/screens/category/BreadCrumb";
import { Box, Container, Grid } from "@mui/material";
import Filter from "../components/screens/category/Filter";
import MainCategory from "../components/screens/category/MainCategory";
import FilterDrawer from "../components/screens/category/FilterDrawer";
import Loading from "../components/common/Loading";
import { sortCategory } from "../utils/helpers/sort";
import { useLocation } from "react-router-dom";
import { listProductByName } from "../utils/api/product";

function Search() {
  const [isOpenFilterMB, setIsOpenFilterMB] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("1");
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await listProductByName(query);
        setListProduct(res?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [query]);

  useEffect(() => {
    const sortData = () => {
      setLoading(true);
      const sortProduct = sortCategory(listProduct, filter);
      setListProduct(sortProduct);
      setLoading(false);
    };
    sortData();
  }, [filter]);

  return (
    <MainLayout isDisplayTermAndQA={true}>
      <BreadCrumb
        setFilter={setFilter}
        filter={filter}
        data={[`KẾT QUẢ TÌM KIẾM CHO "${query}"`]}
        toggleFilter={() => setIsOpenFilterMB(!isOpenFilterMB)}
      />
      <Container>
        <Grid container spacing={4} padding={"20px 0"}>
          <Box
            component={Grid}
            item
            xs={3}
            display={{ xs: "none", sm: "block" }}
          >
            <Filter />
          </Box>
          <Box component={Grid} item xs={12} sm={9}>
            {loading ? (
              <Loading />
            ) : listProduct?.length > 0 ? (
              <MainCategory data={listProduct} />
            ) : (
              <Box
                height={"100%"}
                width={"100%"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box
                  component={"img"}
                  display={"block"}
                  src={"/img/common/NotResult.gif"}
                  width={"100%"}
                  height={"100%"}
                  sx={{ objectFit: "contain" }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
      <FilterDrawer
        open={isOpenFilterMB}
        onClose={() => setIsOpenFilterMB(false)}
      />
    </MainLayout>
  );
}

export default Search;
