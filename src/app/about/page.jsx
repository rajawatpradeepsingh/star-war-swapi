"use client";

import { useState, useEffect } from "react";
import { Box, Grid, Heading, Card, CardBody, Stack } from "@chakra-ui/react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
    }
  }, []);

  return (
    <Box width="100%" mt="15px" p={{ base: 2, md: 4 }}>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {favorites.map((favorite) => {
          return (
            <Card
              key={favorite}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              position="relative"
            >
              <CardBody>
                <Stack mt="6" spacing="3" align="center">
                  <Heading size="md" mb={2}>
                    {favorite}
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
