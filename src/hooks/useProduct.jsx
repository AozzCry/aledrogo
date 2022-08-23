import { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export function GetAllProducts() {
  const {
    resData: products,
    setResData: setProducts,
    error,
    loading,
    fetchProc,
  } = useFetch("/product", "GET");

  useEffect(() => {
    fetchProc();
  }, []);

  return { products, setProducts, error, loading, fetchProc };
}

export function GetOneProduct({ productId }) {
  const {
    resData: product,
    setResData: setProduct,
    error,
    loading,
    fetchProc,
  } = useFetch("/product/" + productId, "GET");

  useEffect(() => {
    fetchProc();
  }, []);

  return { product, setProduct, error, loading, fetchProc };
}

export function GetUserProducts() {
  const {
    resData: products,
    setResData: setProducts,
    error,
    loading,
    fetchProc,
  } = useFetch("/user/products", "GET");

  useEffect(() => {
    fetchProc();
  }, []);

  return { products, setProducts, error, loading, fetchProc };
}

export function DeleteProduct({ productId }) {
  const { fetchProc: DeleteProductProc } = useFetch(
    "/product/" + productId,
    "DELETE"
  );

  return { DeleteProductProc };
}
