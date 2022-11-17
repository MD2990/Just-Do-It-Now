import {
  Box,
  Center,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Wrap,
} from "@chakra-ui/react";

export function MySkeletons() {
  const Skeletons = () => (
    <Box padding="4" boxShadow="lg" bg="white" borderRadius="2xl">
      <Skeleton
        height="20px"
        startColor="gray.50"
        endColor="gray.300"
        borderRadius="2xl"
        mb="2"
      />
      <SkeletonCircle
        size="12"
        startColor="gray.50"
        endColor="gray.300"
        w="44"
        ml="8"
      />
      <SkeletonText
        startColor="gray.50"
        endColor="gray.300"
        mt="4"
        noOfLines={6}
        spacing="6"
        h="15rem"
        w="15rem"
      />
    </Box>
  );
  return (
    <Center p="4" m="4">
      <Wrap
        justify="center"
        textAlign="center"
        spacing={[1, 2, 3, 4]}
        mt={["5%", "6%", "7%", "8%"]}
        p="4"
        m="4"
      >
        <Skeletons />
      </Wrap>
    </Center>
  );
}
