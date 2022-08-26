import API from "../env";
import { Image } from "@chakra-ui/react";

export default function ProductImage({ image, name, size }) {
  return image ? (
    <Image
      boxSize={size}
      objectFit="cover"
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
