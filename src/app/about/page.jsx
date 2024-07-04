"use client";

import { useState, useEffect } from "react";
import { Box, Grid, Heading, Card, CardBody, Stack } from "@chakra-ui/react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

 
  useEffect(() => {
    if (typeof window !== "undefined") {
      return setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    }
  }, []);

  return (
    <Box width="100%" mt='15px'>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {favorites.map((favorites) => {
          return (
            <Card
              maxW="sm"
              key={favorites.name}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              position="relative"
            >
              <CardBody>
                <Stack mt="6" spacing="3" align="center">
                  <Heading
                    size="md"
                    mb={2}
                  >
                    {favorites}
                  </Heading>
                </Stack>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Favorites;
