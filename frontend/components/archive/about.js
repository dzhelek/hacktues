import React from 'react'
import { Box, Collapse, Button, Text } from "@chakra-ui/core"
import { useDisclosure } from "@chakra-ui/core"
const About = (props) => {

    const { isOpen, onToggle } = useDisclosure()

    return(
    <Box backgroundColor="white" pt="10px" display="block" pb="25px" mb={["100px", "30px"]} borderColor="black" borderWidth="10px" rounded="lg" overflow="hidden">
        <Text pl="25px" fontWeight="semibold" color="black" mt="1" as="h2" lineHeight="tight">
            За събитието
        </Text>
        <Collapse animateOpacity startingHeight={100} in={isOpen}>
            <Text pr="25px" pl="25px" color="black" fontWeight="400" as="h3">{props.description}</Text>
        </Collapse>
        <Button ml="25px" _focus={{outline:"none"}} variant="solid" borderWidth="0px" onClick={onToggle} colorScheme="green" size="sm" mt="1rem">
            Покажи {isOpen ? "по-малко" : "повече"}
        </Button>
    </Box>
);
}

export default About;
