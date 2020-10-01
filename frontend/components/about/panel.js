import React from 'react'
import { Box, Flex } from "@chakra-ui/core";
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
    return(
        <Flex marginLeft={["10%", "10%", "100px", "100px"]} marginRight={["10%", "10%", "100px", "100px"]} marginBottom="10px" marginTop="10px"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <Text textAlign="left" paddingLeft="10px" color="black" mt="0" mb="0" as="h2">
                {props.title}
            </Text>
            <Text paddingLeft="10px" color="black">
            <span fontFamily="LLPixel3">Hack TUES</span> {props.description}
            </Text>
        </Flex>
    );
}

export default GetPanelData;