import React from "react";
import { GetWishList } from "../hooks/useWishList";

import WishListProduct from "./WishListProduct";

export default function WishList() {
  const { wishList, setWishList, error, loading } = GetWishList();

  if (loading) return "Loading...";
  if (error) return "Error..." + error;
  return (
    <>
      {wishList &&
        wishList.map((product, index) => {
          return (
            <WishListProduct
              key={index}
              product={product}
              setWishList={setWishList}
            />
          );
        })}
    </>
  );
}
