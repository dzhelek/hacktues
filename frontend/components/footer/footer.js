import React from 'react'
import { Box } from "@chakra-ui/core";
import { Collapse } from '@chakra-ui/core';
import { Button } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core'

const Footer = (props) => {

    return(
    <Box paddingLeft="10px" paddingRight="10px" w="100%" bottom="0" height="auto" borderColor="black" borderWidth="10px" background="lightgrey">
        <Text fontWeight="300" color="black" p="5" as="h4" lineHeight="tight">
        © 2020 – Hack TUES 6 – Технологично училище Електронни системи към Технически Университет - София Всички права са запазени.
        </Text>
    </Box>
);
}

export default Footer;