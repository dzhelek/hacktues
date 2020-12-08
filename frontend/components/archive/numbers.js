import React from 'react'
import { Flex, Box, Text, SimpleGrid } from "@chakra-ui/react";
import { AiOutlineTeam, AiOutlineUser, AiOutlineGift} from 'react-icons/ai';

const Numbers = (props) => {

    return(
        <Box marginBottom="15px" w="auto">
            <Flex rounded="lg" backgroundColor="white" w="auto" alignContent="center" flexDirection="column" flexWrap="wrap">
                <Flex flexGrow="100" flexDirection="row" flex="1">
                
                    <Box flex="1"><Text fontSize={["1.25rem","3.5vw","2.5vw","1.5vw"]} textAlign="center" mr={["0","25px","100px","75px","400px"]} color="black" mt="1" p="10px" fontWeight="semibold" as="h2">Участници</Text></Box>
                    <Box flex="1"><Text fontSize={["1.25rem","3.5vw","2.5vw","1.5vw"]} textAlign="center" color="black" mt="1" p="10px" fontWeight="semibold" as="h2">Отбори</Text></Box>
                    <Box flex="1"><Text fontSize={["1.25rem","3.5vw","2.5vw","1.5vw"]} textAlign="center" ml={["0","25px","100px", "75px", "400px"]} color="black" mt="1" p="10px" fontWeight="semibold" as="h2">Отличени отбори</Text></Box>
    
                </Flex>
                <Flex flexDirection="row" flex="1">
            
                    <Box flex="1"><Text fontSize={["1.5rem","3.5vw","3vw","2vw"]} textAlign="center" mr={["0","25px","100px","300px"]} color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineUser/> {props.allParticipants}</Text></Box>
                    <Box flex="1"><Text fontSize={["1.5rem","3.5vw","3vw","2vw"]} textAlign="center"  color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineTeam/> {props.teams}</Text></Box>
                    <Box flex="1"><Text fontSize={["1.5rem","3.5vw","3vw","2vw"]} textAlign="center" ml={["0","25px","100px","300px"]} color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineGift/> {props.valuedProjects}</Text></Box>
                    
                </Flex>
                </Flex>
        </Box>

    )

}

export default Numbers;