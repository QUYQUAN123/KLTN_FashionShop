export const renderSpecialOffer = (originalPrice, discountPercentage) => {
  const percent = (Number(discountPercentage) / Number(originalPrice)) * 100;

  if (percent >= 50) {
    return "Khuyến mãi cực sốc";
  } else if (percent >= 30) {
    return "Mua sắm đặc biệt";
  } else if (percent >= 20) {
    return "Chương trình ưu đãi đặc biệt";
  } else if (percent >= 10) {
    return "Ưu đãi đặc quyền";
  } else {
    return "Khuyến mãi đặc biệt";
  }
};

export const renderRandomKeyword = () => {
  const keywords = [
    "Quá hời",
    "Mua sắm quá rẻ",
    "Ưu đãi quá chất",
    "Rẻ bèo",
    "Chất lượng giá cực thấp",
  ];

  const randomIndex = Math.floor(Math.random() * keywords.length);
  const randomKeyword = keywords[randomIndex];

  return randomKeyword;
};

export const renderLabelPrice = (price) => {
  if (price >= 1000000) {
    return "Trên 1 triệu";
  } else if (price >= 500000 && price < 1000000) {
    return "Từ 500K - 1 triệu";
  } else if (price >= 100000 && price < 500000) {
    return "Từ 100K - 500K";
  } else {
    return "Dưới 100K";
  }
};
