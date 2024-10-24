import React, { Fragment, useState, useEffect, useCallback } from "react";

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
  uploadImages,
} from "../../actions/productActions";
import { getCategoryAll } from "../../actions/categoryActions";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate, useParams } from "react-router-dom";
import Back from "../layout/Back";
import Variant from "./Variant";
import AddVariant from "./AddVariant";

const UpdateProduct = () => {
  const history = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [variants, setVariants] = useState([]);
  const [show, setShow] = useState(false);

  const [emptyPrice, setEmptyPrice] = useState(false);
  const [emptyName, setEmptyName] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState(false);
  const [emptyImages, setEmptyImages] = useState(false);
  const [emptyVariants, setEmptyVariants] = useState(false);
  const [variantError, setVariantError] = useState(false);

  const { loading: categoryLoading, error: categoryError, categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const productId = id;
  useEffect(() => {
    if (categoryError) {
      toast.error(categoryError);
      dispatch(clearErrors());
    }
  }, [dispatch, categoryError]);

  useEffect(() => {
    dispatch(getCategoryAll());
    if (!product || (product && product._id !== productId) || isUpdated) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setImages(product.images);
      setImagesPreview(product.images);
      setVariants(product.variants);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      history("/shop/products");

      toast.success("Product updated successfully");

      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, isUpdated, updateError, product, productId]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      name === "" ||
      price === 0 ||
      description === "" ||
      category === "" ||
      images.length === 0 ||
      variants.length === 0
    ) {
      if (name === "") {
        setEmptyName(true);
      }
      if (price === "") {
        setEmptyPrice(true);
      }
      if (description === "") {
        setEmptyDescription(true);
      }
      if (category === "") {
        setEmptyCategory(true);
      }
      if (images.length === 0) {
        setEmptyImages(true);
      }
      if (variants.length === 0) {
        setEmptyVariants(true);
      }
      return toast.error("Chưa điền đủ thông tin sản phẩm");
    }

    if (variantError) {
      return toast.error("Sản phẩm có mẫu chưa đủ thông tin");
    }

    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);

    let variantsImages = [];

    await Promise.all(
      variants.map(async (variant, vari) => {
        await Promise.all(
          variant.images.map(async (image, img) => {
            if (typeof image !== "object") {
              const upload = new FormData();
              upload.append("images", image);
              try {
                const result = await dispatch(uploadImages(upload));
                variantsImages.push({
                  variip: vari,
                  imgip: img,
                  image: result,
                });
              } catch (error) {
                console.error("Error uploading image:", error);
              }
            }
          })
        );
      })
    );

    const variantsResult = await Promise.all(variantsImages);

    const updatedVariants = [...variants];

    updatedVariants.forEach((variant, i) => {
      variant.images.forEach((image, j) => {
        if (typeof image !== "object") {
          variantsResult.forEach((result) => {
            if (result.variip === i && result.imgip === j) {
              variant.images[j] = {
                public_id: result.image.image.public_id,
                url: result.image.image.url,
              };
            }
          });
        }
      });
    });

    let totalStock = 0;
    updatedVariants.forEach((variant) => {
      variant.inventory.forEach((inventory) => {
        totalStock += inventory.stock;
      });
    });

    formData.set("totalStock", totalStock);
    formData.set("variants", JSON.stringify(updatedVariants));

    let cloudinaryImages = [];

    images.forEach((image) => {
      if (!image.url) {
        const upload = new FormData();
        upload.append("images", image);
        cloudinaryImages.push(dispatch(uploadImages(upload)));
      }
    });

    const cloudinaryResult = await Promise.all(cloudinaryImages);

    let imagesLinks = [];
    cloudinaryResult.forEach((result) => {
      imagesLinks.push(result.image);
    });

    images.forEach((image) => {
      if (image.url) {
        imagesLinks.push(image);
      }
    });

    formData.set("images", JSON.stringify(imagesLinks));

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const updateVariant = useCallback(
    (updatedVariant, index) => {
      setVariants((prevVariants) => {
        const currentVariants = [...prevVariants];
        currentVariants[index] = updatedVariant;
        return currentVariants;
      });
    },
    [setVariants]
  );

  const removeVariant = useCallback(
    (index) => {
      setVariants((prevVariants) => {
        const updatedVariants = [...prevVariants];
        updatedVariants.splice(index, 1);
        return updatedVariants;
      });
    },
    [setVariants]
  );

  const handlePriceChange = (e) => {
    const inputValue = e.target.value;
    setEmptyPrice(false);

    if (!isNaN(inputValue) && inputValue !== "") {
      const numericValue = parseFloat(inputValue);
      if (numericValue >= 0) {
        setPrice(numericValue);
      } else {
        setPrice(-numericValue);
      }
    } else {
      setPrice("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
    const files = e.dataTransfer.files;
    onChange({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("hover");
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("hover");
  };

  const handlerImageRemove = (index) => {
    const newImages = imagesPreview.filter((img, i) => i !== index);
    const newImagesFiles = images.filter((img, i) => i !== index);
    setImagesPreview(newImages);
    setImages(newImagesFiles);
  };

  return (
    <Fragment>
      <MetaData title={"Update Product"} />
      <div className="new-product-container">
        <div className="new-product-form-container">
          <form
            className="new-product-form"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <Back />
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "25px",
              }}
            >
              Thêm sản phẩm
            </h1>
            <div className="new-product-column">
              <div className="new-product-row-one">
              <div className="new-product-form-group">
  <label htmlFor="category_field">Danh mục</label>
  <select
    className={`form-control ${emptyCategory ? "invalid" : ""}`}
    id="category_field"
    value={category}
    onChange={(e) => {
      setEmptyCategory(false);
      if (e.target.value !== "") {
        setCategory(e.target.value);
      }
    }}
  >
    <option value="">Chọn một danh mục</option>
    {categories && categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.vietnameseName}
      </option>
    ))}
  </select>
  {emptyCategory ? (
    <p
      style={{
        fontWeight: "normal",
        color: "red",
        fontSize: "13px",
      }}
    >
      Sản phẩm chưa chọn danh mục
    </p>
  ) : (
    ""
  )}
</div>
                <div className="new-product-form-group">
                  <label htmlFor="name_field">Tên sản phẩm</label>
                  <input
                    type="text"
                    id="name_field"
                    placeholder="Nhập tên sản phẩm"
                    className={`form-control ${emptyName ? "invalid" : ""}`}
                    value={name}
                    onChange={(e) => {
                      setEmptyName(false);
                      setName(e.target.value);
                    }}
                  />
                  {emptyName ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa có tên
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="new-product-form-group">
                  <label htmlFor="price_field">Giá cơ bản</label>
                  <input
                    type="text"
                    placeholder="Nhập giá sản phẩm"
                    className={`form-control ${emptyPrice ? "invalid" : ""}`}
                    value={price < 0 ? 0 : price}
                    onChange={(e) => handlePriceChange(e)}
                  />
                  {emptyPrice ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa có giá
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="new-product-row-two">
                <div className="new-product-form-group">
                  <label htmlFor="description_field">Mô tả</label>
                  <textarea
                    placeholder="Nhập mô tả sản phẩm"
                    className={`form-control ${
                      emptyDescription ? "invalid" : ""
                    }`}
                    id="description_field"
                    rows="8"
                    value={description}
                    onChange={(e) => {
                      setEmptyDescription(false);
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                  {emptyDescription ? (
                    <p
                      style={{
                        fontWeight: "normal",
                        color: "red",
                        fontSize: "13px",
                      }}
                    >
                      Sản phẩm chưa có mô tả
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Ảnh </label>
              <div className="">
                <label
                  className={`upload-form ${emptyImages ? "invalid" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <input
                    type="file"
                    name="images"
                    onChange={onChange}
                    multiple
                    hidden
                  />
                  <i
                    class="fa fa-cloud-upload"
                    aria-hidden="true"
                    style={{ fontSize: "30px" }}
                  ></i>
                  <p>
                    <strong>Kéo Thả </strong>hoặc <strong>Nhấn </strong>
                    để đưa ảnh lên
                  </p>
                </label>
                {emptyImages ? (
                  <p
                    style={{
                      fontWeight: "normal",
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    Sản phẩm chưa có ảnh
                  </p>
                ) : (
                  ""
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  flexWrap: "wrap",
                  maxWidth: "calc(8 * (75px + 40px))",
                }}
              >
                {imagesPreview.map((img, index) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "50px",
                      gap: "5px",
                    }}
                  >
                    <img
                      src={img.url ? img.url : img}
                      key={index}
                      alt="Images Preview"
                      style={{ height: "100%" }}
                    />
                    <i
                      className="fa fa-remove variant-remove-btn"
                      onClick={() => handlerImageRemove(index)}
                    ></i>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <label htmlFor="sizes_field">Mẫu mã</label>
                <button
                  type="button"
                  className="varient-btn"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <i className="fa fa-plus"></i>Thêm
                </button>
              </div>
              {emptyVariants ? (
                <p
                  style={{
                    fontWeight: "normal",
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  Sản phẩm chưa có mẫu
                </p>
              ) : (
                ""
              )}
              {show && <AddVariant show={setShow} variants={setVariants} />}
              <div className="varient-list">
                {variants &&
                  variants.map((variant, index) => (
                    <Variant
                      key={index}
                      variant={variant}
                      index={index}
                      updateVariant={updateVariant}
                      removeVariant={removeVariant}
                      variantError={setVariantError}
                    />
                  ))}
              </div>
            </div>

            <button
              type="submit"
              className="new-product-btn"
              disabled={loading ? true : false}
            >
              CẬP NHẬT SẢN PHẨM
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
