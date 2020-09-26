import React from 'react'
import { Box } from "@chakra-ui/core";
import { Collapse } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core'

const Panel = (props) => {
    return(
    <Box paddingTop="1%" position="relative" height="auto" borderColor="black" borderWidth="10px" rounded="lg" overflow="hidden">
        <Text color="black" mt="1" fontWeight="semibold" as="h2" lineHeight="tight">
        {props.description}
        </Text>
    </Box>
);
}

export default Panel;