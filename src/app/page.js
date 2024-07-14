"use client";
import React, { useState } from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import CharacterList from "../components/CharacterList";
import CharacterDetails from "../components/CharacterDetails";
import Favorites from "./about/page";

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterClick = (character) => {
    const id = character.url.match(/\/(\d+)\//)[1];
    setSelectedCharacter(id);
  };
  const onClick = () => {
    setSelectedCharacter(null);
  };

  return (
    <Container maxW="container.xxl" py={4}>
      <Box>
        {selectedCharacter ? (
          <CharacterDetails id={selectedCharacter} onClick={onClick}/>
        ) : (
          <CharacterList onCharacterClick={handleCharacterClick}/>
        )}
      </Box>
    </Container>
  );
}
