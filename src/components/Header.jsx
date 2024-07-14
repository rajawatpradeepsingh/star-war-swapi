"use client";

import {
  Box,
  Flex,
  Spacer,
  Button,
  useColorMode,
  useColorModeValue,
  HStack,
  IconButton,
  Collapse,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import MenuItem from "./MenuItem";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");
  const inverted = useColorModeValue("", "invert(1)");
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      bg={bg}
      px={4}
      py={4}
      shadow="md"
      as="header"
      position="sticky"
      top="0"
      zIndex="1000"
      width="100%"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <HStack spacing={{ base: "12px", md: "24px" }} display={{ base: "none", md: "flex" }}>
          <Link href="/">
            <Image
              width={20}
              height={20}
              src="https://static-mh.content.disney.io/starwars/assets/shared/icon_facebook-aec3b685b1a1.svg"
              alt=""
            />
          </Link>
          <Link href="/">
            <Image
              width={20}
              height={20}
              src="https://static-mh.content.disney.io/starwars/assets/shared/icon_instagram-be8807d03d5f.svg"
              alt=""
            />
          </Link>
          <Link href="/">
            <Image
              width={20}
              height={20}
              src="https://static-mh.content.disney.io/starwars/assets/shared/icon_tumblr-9dbf2f5872a3.svg"
              alt=""
            />
          </Link>
          <Link href="/">
            <Image
              width={20}
              height={20}
              src="https://static-mh.content.disney.io/starwars/assets/shared/icon_twitter-bde9a7f5abaa.svg"
              alt=""
            />
          </Link>
          <Link href="/">
            <Image
              width={20}
              height={20}
              src="https://static-mh.content.disney.io/starwars/assets/shared/icon_youtube-ed78c6ee1c7d.svg"
              alt=""
            />
          </Link>
        </HStack>
        <Spacer />
        <Box filter={inverted} >
          <Image
            width={100}
            height={100}
            src="https://download.logo.wine/logo/Star_Wars/Star_Wars-Logo.wine.png"
            alt=""
            style={{ width: 'auto', height: 'auto' }}
          />
        </Box>
        <Spacer />
        <HStack
          spacing={{ base: "0", md: "24px" }}
          display={{ base: "none", md: "flex" }}
        >
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <MenuItem title="Home" address="/" color={color} />
          <MenuItem title="Favorites" address="/about" color={color} />
        </HStack>
        <IconButton
          aria-label="Toggle menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack
          bg={bg}
          p={4}
          display={{ md: "none" }}
          spacing={4}
          align="start"
        >
          <Button onClick={toggleColorMode} w="full" mb={2}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <MenuItem title="Home" address="/" color={color} mb={2}/>
          <MenuItem title="Favorites" address="/about" color={color} mb={2}/>
        </VStack>
      </Collapse>
    </Box>
  );
};

export { Header };
