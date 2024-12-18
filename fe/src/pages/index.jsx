import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import HomeIntroduce from "../components/screens/home/home-introduce";
import HomeSale from "../components/screens/home/home-sale/HomeSale";
import HomeProduct from "../components/screens/home/home-product/HomeProduct";
import { home } from "../utils/api/category";
import Loading from "../components/common/Loading";

function Home() {
  const [saleData, setSaleData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await home();
        const data = res.data;
        setSaleData([data[0]]);
        setProductData(data);
      } catch (error) {}
      setIsLoading(false);
    };
    getData();
  }, []);

  return (
    <MainLayout>
      <HomeIntroduce />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {productData?.map((e) => (
            <HomeProduct key={e._id} data={e} />
          ))}
        </>
      )}
    </MainLayout>
  );
}

export default Home;
