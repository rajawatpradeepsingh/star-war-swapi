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
  HStack,
  VStack,
} from "@chakra-ui/react";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const CharacterDetail = ({ id }) => {
  const { data, error } = useSWR(
    `https://swapi.dev/api/people/${id}/`,
    fetcher
  );

  if (error) return <Text>Error loading character</Text>;
  if (!data)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} mb={4}>
      <Heading size="lg" ml={"45%"}>
        Details
      </Heading>
      <HStack spacing="24px">
        <Image
          src={imageUrl}
          alt={data.name}
          boxSize="200px"
          objectFit="cover"
          mb={4}
          borderRadius={"full"}
        />
        <Heading size="lg">{data.name.toUpperCase()}</Heading>
        <Text>
          <strong>Height:</strong> {data.height}
        </Text>
        <Text>
          <strong>Mass:</strong> {data.mass}
        </Text>
        <Text>
          <strong>Hair Color:</strong> {data.hair_color.toUpperCase()}
        </Text>
        <Text>
          <strong>Skin Color:</strong> {data.skin_color.toUpperCase()}
        </Text>
        <Text>
          <strong>Eye Color:</strong> {data.eye_color.toUpperCase()}
        </Text>
        <Text>
          <strong>Birth Year:</strong> {data.birth_year}
        </Text>
        <Text>
          <strong>Gender:</strong> {data.gender.toUpperCase()}
        </Text>
      </HStack>

      <Heading size="lg" mb={4} ml={"45%"}>
        Movies
      </Heading>

      <List spacing={2} mt={2}>
        <HStack spacing="24px">
          {data.films.map((filmUrl) => (
            <FilmItem key={filmUrl} filmUrl={filmUrl} />
          ))}
        </HStack>
      </List>
    </Box>
  );
};

const FilmItem = ({ filmUrl }) => {
  const { data, error } = useSWR(filmUrl, fetcher);

  if (error) return <ListItem>Error loading film</ListItem>;
  if (!data) return <ListItem>Loading...</ListItem>;

  const filmId = filmUrl.match(/\/(\d+)\//)[1];
  const filmImageUrl = `https://starwars-visualguide.com/assets/img/films/${filmId}.jpg`;

  return (
    <ListItem>
      <HStack spacing={4}>
        <Image
          src={filmImageUrl}
          alt={data.title}
          boxSize="200px"
          objectFit="cover"
          borderRadius={5}
        />
      </HStack>
      <HStack spacing={4}>
        <Text>
          <strong>{data.title}</strong>
        </Text>
      </HStack>
    </ListItem>
  );
};

export default CharacterDetail;
