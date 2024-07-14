"use client";

import {
  Box,
  Heading,
  Text,
  Spinner,
  Center,
  List,
  ListItem,
  Image,
  VStack,
  Stack,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const CharacterDetail = ({ id,onClick }) => {
  const { data, error } = useSWR(
    `https://swapi.dev/api/people/${id}/`,
    fetcher
  );

  if (error) return <Text>Error loading character</Text>;
  if (!data)
    return (
      <Center h="100vh">
        <Spinner size="xl"/>
      </Center>
    );

  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <Box maxW="lg" mx="auto" borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} mb={6} bg={useColorModeValue("white", "gray.800")} shadow="lg">
      <Heading size="lg" textAlign="center" mb={6} color={useColorModeValue("teal.600", "teal.300")}>
      {data.name.toUpperCase()}
      </Heading>
      <Center mb={6}>
        <Image
          src={imageUrl}
          alt={data.name}
          boxSize={"200px"}
          objectFit="cover"
          shadow="md"
          borderRadius="full"
        />
         </Center>
        <VStack align="flex-start" spacing={4}>
          {/* <Heading size="lg">{data.name.toUpperCase()}</Heading> */}
          <Text fontSize="lg">
            <strong>Height:</strong> {data.height}
          </Text>
          <Text fontSize="lg">
            <strong>Mass:</strong> {data.mass}
          </Text>
          <Text fontSize="lg">
            <strong>Hair Color:</strong> {data.hair_color.toUpperCase()}
          </Text>
          <Text fontSize="lg">
            <strong>Skin Color:</strong> {data.skin_color.toUpperCase()}
          </Text>
          <Text fontSize="lg">
            <strong>Eye Color:</strong> {data.eye_color.toUpperCase()}
          </Text>
          <Text fontSize="lg">
            <strong>Birth Year:</strong> {data.birth_year}
          </Text>
          <Text fontSize="lg">
            <strong>Gender:</strong> {data.gender.toUpperCase()}
          </Text>
        </VStack>
      

      <Heading size="lg" textAlign="center" mb={4} mt={8} color={useColorModeValue("teal.600", "teal.300")}>
        Movies
      </Heading>

      <List spacing={3}>
          {data.films.map((filmUrl) => (
            <FilmItem key={filmUrl} filmUrl={filmUrl} />
          ))}
           <Button
          variant="solid"
          colorScheme="teal"
          onClick={() => onClick(null)}
          width='100%'
        >
         Close
        </Button>
      </List>
     
    </Box>
  );
};

const FilmItem = ({ filmUrl }) => {
  const { data, error } = useSWR(filmUrl, fetcher);

  if (error) return <ListItem color="red.500">Error loading film</ListItem>;
  if (!data) return <ListItem>Loading...</ListItem>;

  const filmId = filmUrl.match(/\/(\d+)\//)[1];
  const filmImageUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;

  return (
    <ListItem borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg={useColorModeValue("gray.100", "gray.700")} shadow="md">
       <Stack direction={["column", "row"]} spacing={4} align="center">
        <Image
          src={filmImageUrl}
          alt={data.title}
          boxSize={"150px"}
          objectFit="cover"
          borderRadius={5}
           shadow="md"
        />
        <Text fontSize="lg" fontWeight="bold">
          <strong>{data.title}</strong>
        </Text>
      </Stack>
 
    </ListItem>
  );
};

export default CharacterDetail;
