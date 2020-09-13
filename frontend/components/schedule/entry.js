import React from 'react';
import { Box, Button, Text, Link } from "@chakra-ui/core";


const Entry = props => (

    <Box m="1%" alignSelf="center" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" w="100%" p="4" >
        <Text textAlign="center" alignSelf="center">{props.title}</Text>
        <Text textAlign="center" alignSelf="center">{props.time}</Text>
        <Box alignSelf="center">
            <Link href={props.link} isExternal>
                <Button aria-label="lol" rounded="1g" variantColor="green" >{props.emoji}{props.place}</Button>
            </Link>
        </Box>
    </Box>

);

export default Entry;