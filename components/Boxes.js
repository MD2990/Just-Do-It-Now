import { VStack, WrapItem } from "@chakra-ui/react";

export const Boxes = ({
  children,
  done,
  notDone,
  onClick,
  color = done ? "green.400" : "red.400",
}) => (
  <WrapItem onClick={onClick} cursor="pointer" >
    <VStack
      bg={`${done ? "green.50" : notDone ? "red.50" : "null"}`}
      userSelect="none"
      justify="center"
      align="center"
      textAlign="center"
      m={2}
      boxShadow="lg"
      p={[1, 2, 3, 4]}
      rounded="md"
      alignContent={"center"}
      justifyContent="center"
      justifySelf={"center"}
      alignSelf="center"
      justifyItems={"center"}
      fontSize={["lg", "2xl", "3xl", "4xl"]}
      fontFamily="sans"
      fontWeight="bold"
      color={color}
    >
      {children}
    </VStack>
  </WrapItem>
);
