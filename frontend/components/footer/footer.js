import React from 'react'
import { Box, Link, Flex, Text, Icon } from "@chakra-ui/react";
import { FiInstagram, FiFacebook, FiYoutube, FiMail } from 'react-icons/fi';

const Footer = (props) => {

    return(
    <Box display="block" h="auto" w="100%" mt="-100px" justifyContent="center" position="absolute" bottom="0" paddingLeft="10px" paddingRight="10px"  borderColor="black" borderWidth="10px" background="#a5cf9f">
        <Flex justifyContent="center" flexDirection={["column","row","row","row"]} flexWrap="wrap">
            <Text mb="0" wordBreak="break-all" fontSize={"6px","14px"} alignSelf="center" fontWeight="300" color="white" mb={["0","0","0","25px"]} pl="2" pt={["0","2"]} pb={["0","2"]} as="h4" lineHeight="tight">
                <Link paddingRight="10px" _focus={{outline:"none"}} href="https://instagram.com/hacktues">
                    <Icon as={FiFacebook} width="24px" height="24px"></Icon>
                </Link>
                <Link paddingRight="10px" _focus={{outline:"none"}} href="https://facebook.com/hacktues">
                    <Icon as={FiInstagram} background="transparent" width="24px" height="24px"></Icon>
                </Link>
                <Link paddingRight="10px" _focus={{outline:"none"}} href="https://www.youtube.com/channel/UCQcbYkAKPEgfjzvwb2sUWSQ">
                    <Icon as={FiYoutube} background="transparent" width="24px" height="24px"></Icon>
                </Link>
                <Link paddingRight="10px" _focus={{outline:"none"}} href="mailto:hacktues@elsys-bg.org">
                    <Icon as={FiMail} background="transparent" width="24px" height="24px"></Icon>
                </Link>
            </Text>
            <Text wordBreak="break-all" fontSize={"6px","14px"} alignSelf="center" fontWeight="300" color="white" mt={["0","0","0","10px"]} pr="2" pt="2" pb="2" as="h4" as="h4" lineHeight="tight">
                © 2020 – Hack TUES 6 – Технологично училище Електронни системи към Технически Университет - София Всички права са запазени.
            </Text>
        </Flex>
    </Box>
);
}

export default Footer;