import React from 'react'
import { Box, Flex } from "@chakra-ui/core";
import { Text } from '@chakra-ui/core'
import { Divider } from "@chakra-ui/core";
import ReactMarkdown from 'react-markdown'


function GetPanelData(params) {
    let content = [];
        for (let x = 0; x < params.lenght; x++) {
            content.push(<Panel marginTop="25px" key={x} title={params.panels[x].title} description={params.panels[x].description}/>);
        }
    return content;
}

const Panel = (props) => {

    return(
    <Flex marginLeft="100px" marginRight="100px" marginBottom="10px" marginTop="10px" flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
        <Text paddingLeft="10px" color="black" mb="1" mt="1" fontWeight="semibold" as="h1" lineHeight="tight">
            <ReactMarkdown source={props.title} />
        </Text>
        <Divider width="99%"/>
        <Text paddingLeft="10px" color="black" lineHeight="tight">
            <ReactMarkdown source={props.description} />
        </Text>
    </Flex>
    );
}

export default GetPanelData;