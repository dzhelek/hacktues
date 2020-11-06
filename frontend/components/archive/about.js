import React from 'react'
import { Box } from "@chakra-ui/core";
import { Collapse } from '@chakra-ui/core';
import { Button } from '@chakra-ui/core';
import { Text } from '@chakra-ui/core'

const About = (props) => {

    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    return(
    <Box backgroundColor="white" display="block" pb={["100px", "30px"]} paddingTop="1%" borderColor="black" borderWidth="10px" rounded="lg" overflow="hidden">
        <Text pl="20px" fontWeight="semibold" color="black" mt="1" as="h2" lineHeight="tight">
            За събитието
        </Text>
        <Collapse startingHeight={110} isOpen={show}>
            <Text pl="20px" color="black" fontWeight="400" as="h3">{props.description}</Text>
        </Collapse>
        <Button ml="20px" _focus="outline: none;" variant="solid" borderWidth="0px" variantColor="green" size="sm" onClick={handleToggle} mt="1rem">
            Покажи {show ? "по-малко" : "повече"}
        </Button>
    </Box>
);
}

export default About;
