import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import LandingImage from "../assets/landing.jpg";

function Layout({ children }) {
  return (
    <Box
      position={"relative"}
      style={{
        backgroundImage: `url(${LandingImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <Flex justify={"center"}>{children}</Flex>
    </Box>
  );
}

export default Layout;
