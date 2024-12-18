export const sortCategory = (category, sort) => {
  if (sort == "1") {
    category.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      const timeComparison = bDate.getTime() - aDate.getTime();
      if (timeComparison === 0) {
        return a.name.localeCompare(b.name);
      }

      return timeComparison;
    });
  }

  if (sort == "2") {
    category.sort(
      (a, b) => parseInt(b.discountPrice) - parseInt(a.discountPrice)
    );
  }

  if (sort == "3") {
    category.sort(
      (a, b) => parseInt(a.discountPrice) - parseInt(b.discountPrice)
    );
  }

  if (sort == "4") {
    category.sort(
      (a, b) =>
        parseInt(b.price - b.discountPrice) -
        parseInt(a.price - a.discountPrice)
    );
  }

  if (sort == "5") {
    category.sort(
      (a, b) =>
        parseInt(a.price - a.discountPrice) -
        parseInt(b.price - b.discountPrice)
    );
  }

  return [...category];
};
