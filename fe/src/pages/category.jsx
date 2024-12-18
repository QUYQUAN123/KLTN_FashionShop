import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import BreadCrumb from "../components/screens/category/BreadCrumb";
import { Box, Container, Grid } from "@mui/material";
import Filter from "../components/screens/category/Filter";
import MainCategory from "../components/screens/category/MainCategory";
import FilterDrawer from "../components/screens/category/FilterDrawer";
import { useParams } from "react-router-dom";
import { getCategoryById } from "../utils/api/category";
import Loading from "../components/common/Loading";
import { sortCategory } from "../utils/helpers/sort";

function Category() {
  const [isOpenFilterMB, setIsOpenFilterMB] = useState(false);
  const [title, setTitle] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [filter, setFilter] = useState("1");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await getCategoryById(id);
        setTitle(res?.data?.map((e) => e.name));
        setListProduct(res?.data?.map((e) => e.product).flat());
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
  }, [id]);

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
        data={title}
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
            <Filter id={id} />
          </Box>
          <Box component={Grid} item xs={12} sm={9}>
            {loading ? <Loading /> : <MainCategory data={listProduct} />}
          </Box>
        </Grid>
      </Container>
      <FilterDrawer
        open={isOpenFilterMB}
        onClose={() => setIsOpenFilterMB(false)}
        id={id}
      />
    </MainLayout>
  );
}

export default Category;
