"use client";
import {
  Box,
  Flex,
  Spacer,
  Button,
  useColorMode,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import MenuItem from "./MenuItem";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");
  const inverted = useColorModeValue("", "invert(1)");

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
      <Flex alignItems="center">
        <HStack spacing="24px">
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
        <Box filter={inverted}>
          <Image
            width={150}
            height={200}
            src="https://download.logo.wine/logo/Star_Wars/Star_Wars-Logo.wine.png"
            alt=""
          />
        </Box>

        <Spacer />

        <HStack spacing="24px">
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <MenuItem title="Home" address="/" color={color} />
          <MenuItem title="Favorites" address="/about" color={color} />
        </HStack>
      </Flex>
    </Box>
  );
};

export { Header };
