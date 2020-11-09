import React from 'react'
import { Box, Collapse, Button, Text } from "@chakra-ui/core"

const About = (props) => {

    const [show, setShow] = React.useState(false);
    const handleToggle = () => setShow(!show);

    return(
    <Box backgroundColor="white" pt="10px" display="block" pb="25px" mb={["100px", "30px"]} borderColor="black" borderWidth="10px" rounded="lg" overflow="hidden">
        <Text pl="25px" fontWeight="semibold" color="black" mt="1" as="h2" lineHeight="tight">
            За събитието
        </Text>
        <Collapse startingHeight={100} isOpen={show}>
            <Text pr="25px" pl="25px" color="black" fontWeight="400" as="h3">{props.description}</Text>
        </Collapse>
        <Button ml="25px" _focus="outline: none;" variant="solid" borderWidth="0px" variantColor="green" size="sm" onClick={handleToggle} mt="1rem">
            Покажи {show ? "по-малко" : "повече"}
        </Button>
    </Box>
);
}

export default About;
