import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { convertCurrency } from "../../utils/helpers/convertCurrency";

const ProductCardWraper = styled(Box)({
  position: "relative",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    "& .img": {
      transform: "scale(1.15)",
    },
  },
  borderRadius: "15px",
  boxShadow: "0 1px 3px -2px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
  background: "#fff",
});

const WrapImg = styled(Box)({
  overflow: "hidden",
  maxHeight: "auto",
  "& .img": {
    display: "block",
    transition: "all 0.3s ease-in-out",
    width: "100%",
    objectFit: "contain",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
});

const Label = styled(Box)({
  position: "absolute",
  fontSize: 13,
  marginLeft: -3,
  marginTop: 3,
  zIndex: 1,
  background: "#f00",
  borderRadius: "8px 30px 30px 0",
  "&::after": {
    position: "absolute",
    content: `""`,
    width: 3,
    height: 4,
    background: "#8b0018",
    borderRadius: "0 0 0 15px",
    top: "100%",
  },
});

const LabelContent = styled(Box)({
  padding: "9px 6px",
  fontSize: "10px",
  color: "#fff",
  fontWeight: 700,
});

function ProductCard({ item }) {
  const navigate = useNavigate();
  return (
    <ProductCardWraper
      onClick={() => {
        navigate(`/product/${item?._id}`);
      }}
    >
      {item?.label && (
        <Label>
          <LabelContent>{item?.label}</LabelContent>
        </Label>
      )}

      <WrapImg>
        <Box
          component={"img"}
          src={item?.img1}
          className="img"
          maxHeight={190}
          sx={{ objectFit: "cover" }}
        />
      </WrapImg>
      <Box px={"10px"} pt={"0.7em"} pb={"1.4em"}>
        <Typography
          fontSize={"15px"}
          color={"#0f0f0f"}
          textAlign={"center"}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.5,
            minHeight: "calc(1.5em * 2)",
          }}
        >
          {item?.name}
        </Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Box display={"flex"} alignItems={"flex-start"}>
            {item?.price && (
              <Typography
                fontSize={14}
                color={"#dd3333"}
                sx={{ textDecoration: "line-through" }}
              >
                {convertCurrency(item?.price)}
              </Typography>
            )}

            <Typography
              fontSize={12}
              color={"#dd3333"}
              sx={{ textDecoration: "line-through" }}
            >
              ₫
            </Typography>
          </Box>
          <Box display={"flex"} alignItems={"flex-start"}>
            <Typography fontSize={14} color={"#dd3333"} fontWeight={700}>
              {convertCurrency(item?.discountPrice)}
            </Typography>
            <Typography fontSize={12} color={"#dd3333"} fontWeight={700}>
              ₫
            </Typography>
          </Box>
        </Box>
      </Box>
    </ProductCardWraper>
  );
}

export default ProductCard;
