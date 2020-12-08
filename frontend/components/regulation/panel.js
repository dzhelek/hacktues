import React from 'react'
import { Box, Flex, Text } from "@chakra-ui/react"
import { Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, } from "@chakra-ui/react";

import {AddIcon, MinusIcon } from '@chakra-ui/icons'

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
    {({ isExpanded }) => (
        <Flex marginLeft={["25px", "25px", "100px", "200px"]} marginRight={["25px", "25px", "100px", "200px"]} marginTop="10px"  flexDirection="row" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <AccordionButton border="0" backgroundColor="white" _focus={{outline:0, background:"white"}}>
                <Text fontFamily="Rubik" textAlign="left" paddingLeft="10px" color="black" mt="0" mb="0" as="h3">
                    {props.title}
                </Text>
                {isExpanded ? (
            <MinusIcon marginLeft="auto" marginRight="10px" fontSize="12px" />
          ) : (
            <AddIcon marginLeft="auto" marginRight="10px" fontSize="12px" />
          )}
            </AccordionButton>
            <AccordionPanel pb={4}>
            <Text paddingLeft={["0px","0px","0px","10px"]}>
                {props.description}
            </Text>
            </AccordionPanel>
        </Flex>
    )}
    </AccordionItem>
);
}
export default GetPanelData