import API from "../env";
import { Image, scaleFadeConfig } from "@chakra-ui/react";

export default function ProductImage({ images }) {
  return images.length ? (
    <Image boxSize="100px" objectFit="cover" src={API + "/" + images[0]} />
  ) : (
    <Image
      boxSize="100px"
      objectFit="cover"
      src="https://bit.ly/dan-abramov"
      alt="Dan Abramov"
    />
  );
}
