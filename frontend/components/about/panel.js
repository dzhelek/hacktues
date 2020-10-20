import React from 'react'
import { Box, Flex } from "@chakra-ui/core";
import { Text } from '@chakra-ui/core'
import { Divider } from "@chakra-ui/core";
import { jsx, css } from '@emotion/core'

function GetPanelData(params) {
    let content = [];
        for (let x = 0; x < params.lenght; x++) {
            content.push(<Panel marginTop="25px" key={x} title={params.panels[x].title} description={params.panels[x].description}/>);
        }
    return content;
}

const Panel = (props) => {
    return(
        <Flex margin="0 auto" marginLeft={["10%", "10%", "100px", "100px"]} marginRight={["10%", "10%", "100px", "100px"]} marginTop="10%"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <Text textAlign="left" paddingLeft="10px" color="black" mt="0" mb="0" as="h2">
                {props.title}
            </Text>
            <Text fontFamily="llpixel" paddingLeft="10px">
            <span>Hack</span><span >TUES</span>{props.description}
            </Text>
        </Flex>
    );
}

export default GetPanelData;