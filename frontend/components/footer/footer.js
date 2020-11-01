import React from 'react'
import { Box, Link, Flex } from "@chakra-ui/core";
import { Collapse } from '@chakra-ui/core';
import { Button } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core'
import { FiInstagram, FiFacebook, FiYoutube, FiMail } from 'react-icons/fi';
import { Icon } from "@chakra-ui/core";

const Footer = (props) => {

    return(
    <Box display="block" h="auto" w="100%" mt="-100px" justifyContent="center" position="absolute" bottom="0" paddingLeft="10px" paddingRight="10px"  borderColor="black" borderWidth="10px" background="#a5cf9f">
        <Flex flexDirection={["row","column","column","column"]} flexWrap="wrap">
        <Text fontSize={"6px","14px"} alignSelf="center" fontWeight="300" color="black" p="2" as="h4" lineHeight="tight">
                <span>
                <Link paddingRight="10px" _focus="outline: none;" href="https://instagram.com/hacktues">
                    <Icon as={FiFacebook}  size="25px"></Icon>
                </Link>
                <Link paddingRight="10px" _focus="outline: none;" href="https://facebook.com/hacktues">
                    <Icon as={FiInstagram} background="transparent" size="25px"></Icon>
                </Link>
                <Link paddingRight="10px" _focus="outline: none;" href="https://www.youtube.com/channel/UCQcbYkAKPEgfjzvwb2sUWSQ">
                    <Icon as={FiYoutube} background="transparent" size="25px"></Icon>
                </Link>
                <Link paddingRight="10px" _focus="outline: none;" href="mailto:hacktues@elsys-bg.org">
                    <Icon as={FiMail} background="transparent" size="25px"></Icon>
                </Link>
                </span>
            © 2020 – Hack TUES 6 – Технологично училище Електронни системи към Технически Университет - София Всички права са запазени.
        </Text>
        </Flex>
        
    </Box>
);
}

export default Footer;