import React from "react";
import { Box, Flex } from "@chakra-ui/react";

function Wrapper({ children }) {
  return (
    <Box
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      margin={[50, "auto", "auto"]}
      p={6}
      maxWidth={["100%", "75%", "50%", "25%"]}
      position={"absolute"}
      top="50"
      left={[null, null, null, 100]}
    >
      <Flex direction={"column"}>{children}</Flex>
    </Box>
  );
}

export default Wrapper;
