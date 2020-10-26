import React from 'react'
import { Flex, Box, SimpleGrid, Text } from "@chakra-ui/core";
import { AiOutlineTeam, AiOutlineUser, AiOutlineGift} from 'react-icons/ai';

const Numbers = (props) => {

    return(
        <Box>
            <Flex w="100%" alignContent="center" flexDirection="column" flexWrap="wrap">
                <Flex flexDirection={["column", "column", "column", "row"]} flex="1">
                    <Box flex="1"><Text textAlign="center" top="50%" left="50%" color="black" mt="1" p="10px" fontWeight="semibold" fontSize="1.5rem" as="h2">Участници</Text></Box>
                    <Box flex="1"><Text textAlign="center" top="50%" left="50%" color="black" mt="1" p="10px" fontWeight="semibold" fontSize="1.5rem" as="h2">Отбори</Text></Box>
                    <Box flex="1"><Text textAlign="center" top="50%" left="50%" color="black" mt="1" p="10px" fontWeight="semibold" fontSize="1.5rem" as="h2">Отличени отбори</Text></Box>
                </Flex>
                <Flex flexDirection={["column", "column", "column", "row"]} flex="1">
                    <Box flex="1"><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineUser/> {props.allParticipants}</Text></Box>
                    <Box flex="1"><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineTeam/> {props.teams}</Text></Box>
                    <Box flex="1"><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineGift/> {props.valuedProjects}</Text></Box>
                </Flex>
                </Flex>
        </Box>

    )

}

export default Numbers;