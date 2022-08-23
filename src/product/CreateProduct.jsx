import React, { useState } from "react";
import API from "../env";
import axios from "axios";

import { Button, FormControl, Input, useToast } from "@chakra-ui/react";

export default function CreateProduct() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [count, setCount] = useState("");
  const [desc, setDesc] = useState("");
  const [categoryString, setCategoryString] = useState("");
  const [category, setCategory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        `${API}/product`,
        {
          name,
          price,
          count,
          desc,
          category,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setCategory([]);
      toast({
        title: name + " created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <Input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl>
        <Input
          type="number"
          value={price}
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl>
        <Input
          type="number"
          value={count}
          placeholder="Enter count"
          onChange={(e) => setCount(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl>
        <Input
          type="text"
          value={desc}
          placeholder="Enter description"
          onChange={(e) => setDesc(e.target.value)}
        ></Input>
      </FormControl>
      <FormControl>
        <Input
          type="text"
          value={categoryString}
          placeholder="Enter category"
          onChange={(e) => setCategoryString(e.target.value)}
        ></Input>
      </FormControl>
      <Button
        variant="primary"
        onClick={() => {
          categoryString !== "" && setCategory(category.concat(categoryString));
          setCategoryString("");
        }}
      >
        Add category
      </Button>
      {category && (
        <div>
          {category.map((cat, index) => {
            return cat + " ";
          })}
        </div>
      )}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
