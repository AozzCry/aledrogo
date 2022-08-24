import { useEffect } from "react";
import useFetch from "../hooks/useFetch";

export function GetWishList() {
  const {
    resData: wishList,
    setResData: setWishList,
    error,
    loading,
    fetchProc,
  } = useFetch("/wishlist", "GET");

  useEffect(() => {
    fetchProc();
  }, [fetchProc]);

  return { wishList, setWishList, error, loading, fetchProc };
}

export function AddToWishList({ productId }) {
  const { fetchProc: AddToWishListProc } = useFetch("/wishlist", "POST", {
    productId,
  });
  return { AddToWishListProc };
}

export function DeleteFromWishList({ productId }) {
  const { fetchProc: DeleteFromWishListProc } = useFetch(
    "/wishlist/" + productId,
    "DELETE"
  );
  return { DeleteFromWishListProc };
}
