import React from 'react'
import { Box, Flex, Text } from "@chakra-ui/core"
import { Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionPanel,
    AccordionIcon, } from "@chakra-ui/core";

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
        <Flex marginLeft={["25px", "25px", "100px", "200px"]} marginRight={["25px", "25px", "100px", "200px"]} marginTop="10px"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <AccordionHeader border="0" backgroundColor="white" _focus={{outline:0, background:"white"}}>
                <Text fontFamily="Rubik" textAlign="left" paddingLeft="10px" color="black" mt="0" mb="0" as="h3">
                    {props.title}
                </Text>
            </AccordionHeader>
            <AccordionPanel pb={4}>
            <Text paddingLeft={["0px","0px","0px","10px"]}>
                {props.description}
            </Text>
            </AccordionPanel>
        </Flex>
    </AccordionItem>
    );
}

export default GetPanelData;