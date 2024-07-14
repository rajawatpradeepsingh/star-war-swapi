"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  Image,
  Card,
  CardBody,
  Stack,
  Divider,
  CardFooter,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, StarIcon } from "@chakra-ui/icons";
import { fetcher } from "../utils/fetcher";

const CharacterList = ({ onCharacterClick }) => {
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    }
    return [];
  });

  const { data, error } = useSWR(
    `https://swapi.dev/api/people/?page=${page}`,
    fetcher
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (character) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(character.name)) {
        return prevFavorites.filter((name) => name !== character.name);
      }
      return [...prevFavorites, character.name];
    });
  };

  if (error) return <Text>Error loading characters</Text>;
  if (!data)
    return (
      <Center>
        <Spinner />
      </Center>
    );

  return (
    <Box width="100%" p={{ base: 2, md: 4 }}>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {data.results.map((character) => {
          const id = character.url.match(/\/(\d+)\//)[1];
          const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

          return (
            <Card
              //maxW="sm"
              key={character.name}
              borderWidth="2px"
              borderRadius="lg"
              borderColor='teal'
              overflow="hidden"
              p={4}
              position="relative"
            >
              <CardBody>
                <Image src={imageUrl} alt={character.name} borderRadius="lg" width="100%"
                  objectFit="cover"/>
                <Stack mt="6" spacing="3" align="center">
                  <Heading
                    size="md"
                    mb={2}
                    cursor="pointer"
                    onClick={() => onCharacterClick(character)}
                  >
                    {character.name}
                  </Heading>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter alignSelf='center'>
                <ButtonGroup spacing="2">
                  <Button
                    variant="solid"
                    colorScheme="teal"
                    onClick={() => onCharacterClick(character)}
                  >
                    Details
                  </Button>
                  <Button
                    rightIcon={
                      <StarIcon
                        color={
                          favorites.includes(character.name) ? "yellow" : "gray"
                        }
                      />
                    }
                    colorScheme="teal"
                    onClick={() => toggleFavorite(character)}
                    variant="outline"
                  >
                    Favorite
                  </Button>
                </ButtonGroup>
                {/* <IconButton
                icon={<StarIcon />}
                colorScheme={favorites.includes(character.name) ? 'yellow' : 'gray'}
                aria-label="Favorite"
                position="absolute"
                bottom={2}
                right={2}
                onClick={() => toggleFavorite(character)}
                variant={'ghost'}
              /> */}
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
      <Flex justifyContent="space-around" mt={4} px={{ base: 2, md: 4 }}>
        <Button
          leftIcon={<ArrowLeftIcon />}
          onClick={() => setPage(page - 1)}
          isDisabled={!data.previous}
        >
          Previous
        </Button>
        <Button
          rightIcon={<ArrowRightIcon />}
          onClick={() => setPage(page + 1)}
          isDisabled={!data.next}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default CharacterList;
