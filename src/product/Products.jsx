import React, { useEffect, useState } from "react";
import { GetAllProducts } from "../hooks/useProduct";
import {
  Button,
  FormControl,
  Select,
  Input,
  Wrap,
  GridItem,
  Box,
  FormLabel,
  Grid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Center,
} from "@chakra-ui/react";
import Product from "./Product";

export default function Products() {
  const { products, error, loading } = GetAllProducts();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [productCount, setProductCount] = useState(4);

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
        for (const cate of product.category) {
          if (!cats.includes(cate)) {
            cats.push(cate);
          }
        }
      }
      setCategories(cats);
    }
  }, [products]);

  if (loading) return "Loading" + error;
  if (error) return "Error..." + error;
  return (
    <Box>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text align={"center"}> Filter by catogory</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Center>
              <Wrap className="m-1">
                {categories.map((cate, index) => {
                  return (
                    <Button
                      key={index}
                      bg={cate === category ? "teal.500" : "teal.800"}
                      onClick={() => {
                        if (category === "" || category !== cate)
                          setCategory(cate);
                        else setCategory("");
                      }}
                    >
                      {cate}
                    </Button>
                  );
                })}
              </Wrap>
            </Center>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
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
      <Select className="m-1" onChange={(e) => setSortState(e.target.value)}>
        <option value="bestGrade">Highest grade</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
        <option value="lowestPrice">Lowest price</option>
        <option value="highestPrice">Highest price</option>
      </Select>
      {products && (
        <Grid templateColumns={"repeat(4, 2fr)"}>
          {products
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )
            .filter((product) =>
              category ? product.category.includes(category) : true
            )
            .sort(sortMethods[sortState].method)
            .slice(0, productCount)
            .map((product, index) => {
              return (
                <GridItem className="m-1">
                  <Product key={index} product={product} />
                </GridItem>
              );
            })}
        </Grid>
      )}
      <Button
        className="m-1"
        onClick={() => {
          setProductCount(productCount + 4);
        }}
      >
        Load more
      </Button>
    </Box>
  );
}
