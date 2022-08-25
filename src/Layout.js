import React from "react";
import { Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" justify="space-between" minHeight="100vh">
      {children}
    </Flex>
  );
};

export default Layout;
