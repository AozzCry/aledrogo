import React, { useEffect, useState } from "react";

import { GetAllProducts } from "../hooks/useProduct";

import {
  Button,
  FormControl,
  Select,
  Input,
  Wrap,
  WrapItem,
  Box,
  FormLabel,
} from "@chakra-ui/react";

import Product from "./Product";
import ProductSkeleton from "./ProductSkeleton";

export default function Products() {
  const { products, error, loading } = GetAllProducts();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productCount, setProductCount] = useState(5);

  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState("bestGrade");

  const sortMethods = {
    ascending: { method: (a, b) => (a.name < b.name ? -1 : 1) },
    descending: { method: (a, b) => (a.name > b.name ? -1 : 1) },
    lowestPrice: { method: (a, b) => (a.price < b.price ? -1 : 1) },
    highestPrice: { method: (a, b) => (a.price > b.price ? -1 : 1) },
    bestGrade: {
      method: (a, b) =>
        a.reviews.reduce((p1, p2) => p1 + p2.grade, 0) /
          (a.reviews.length > 0 ? a.reviews.length : 1) >
        b.reviews.reduce((p1, p2) => p1 + p2.grade, 0) /
          (b.reviews.length > 0 ? b.reviews.length : 1)
          ? -1
          : 1,
    },
  };

  useEffect(() => {
    if (products) {
      let cats = [];
      for (const product of products) {
        for (const category of product.category) {
          if (!cats.includes(category)) {
            cats.push(category);
          }
        }
      }
      setCategories(cats);
    }
  }, []);

  if (error) return "Error..." + error;
  return (
    <Box>
      <Wrap className="m-1">
        <Button onClick={() => setCategory("")}>Show all</Button>
        {categories.map((category, index) => {
          return (
            <Button key={index} onClick={() => setCategory(category)}>
              {category}
            </Button>
          );
        })}
      </Wrap>
      <form>
        <FormControl>
          <FormLabel>Search</FormLabel>
          <Input
            type="text"
            value={search}
            placeholder="Search string"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>
      </form>
      {products && (
        <Wrap>
          <Select
            className="m-1"
            onChange={(e) => setSortState(e.target.value)}
          >
            <option value="bestGrade">Highest grade</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="lowestPrice">Lowest price</option>
            <option value="highestPrice">Highest price</option>
          </Select>
          <WrapItem className="m-1">
            {loading ? <><ProductSkeleton/><ProductSkeleton /><ProductSkeleton/></> : 
            products
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .filter((product) =>
                category ? product.category.includes(category) : true
              )
              .sort(sortMethods[sortState].method)
              .slice(0, productCount)
              .map((product, index) => {
                return <Product key={index} product={product} />;
              })} 
          </WrapItem>
        </Wrap>
      )}
      <Button
        className="m-1"
        onClick={() => {
          setProductCount(productCount + 5);
        }}
      >
        Load more
      </Button>
    </Box>
  );
}
