import API from "../env";
import { Image } from "@chakra-ui/react";

export default function ProductImage({ image, name, size }) {
  return image ? (
    <Image
      border={"4px"}
      borderColor={"teal.400"}
      borderRadius={"5px"}
      boxSize={size}
      objectFit="cover"
      w={"100%"}
      alt={name}
      src={API + "/" + image}
    />
  ) : (
    <Image
      boxSize="100px"
      objectFit="cover"
      src="https://bit.ly/dan-abramov"
      alt="Dan Abramov"
    />
  );
}
