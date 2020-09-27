import React from 'react'
import { Box } from "@chakra-ui/core";
import { Text } from '@chakra-ui/core'
import { Divider } from "@chakra-ui/core";

function GetPanelData(params) {
 
    let content = [];
        for (let x = 0; x < params.lenght; x++) {
            content.push(<Panel marginTop="25px" key={x} title={params.panels[x].title} description={params.panels[x].description}/>);
        }
    return content;
}

const Panel = (props) => {

    console.log(props.title);

    return(
    <Box paddingTop="1%" position="relative" height="auto" borderColor="black" borderWidth="10px" rounded="lg" overflow="hidden">
        <Text color="black" mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
        {props.title}
        </Text>
        <Divider />
        <Text color="black" mt="1" lineHeight="tight">
        {props.description}
        </Text>
    </Box>
    );
}

export default GetPanelData;