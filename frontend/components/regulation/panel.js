import React from 'react'
import { Box, Flex } from "@chakra-ui/core";
import { Text } from '@chakra-ui/core'
import { Divider, Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon, } from "@chakra-ui/core";
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
    <AccordionItem>
        <Flex marginLeft={["50px", "50px", "100px", "100px"]} marginRight={["100px", "100px", "100px", "100px"]} marginTop="10px"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <AccordionHeader border="0" backgroundColor="white" _focus={{outline:0, background:"white"}}>
                <Text fontFamily="Rubik" textAlign="left" paddingLeft="10px" color="black" mt="0" mb="0" as="h3">
                    {props.title}
                </Text>
            </AccordionHeader>
            <AccordionPanel pb={4}>
            <Text paddingLeft="10px">
                {props.description}
            </Text>
            </AccordionPanel>
        </Flex>
    </AccordionItem>
    );
}

export default GetPanelData;