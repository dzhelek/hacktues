import React from 'react'
import { Box, SimpleGrid, Text } from "@chakra-ui/core";
import { AiOutlineTeam, AiOutlineUser, AiOutlineGift} from 'react-icons/ai';

const Numbers = (props) => {

    return(
        <Box>
            <SimpleGrid columns="3">
                <Box><Text textAlign="center" top="50%" left="50%" color="black" mt="1" fontWeight="semibold" as="h2">Участници</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" mt="1" fontWeight="semibold" as="h2">Отбори</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" mt="1" fontWeight="semibold" as="h2">Отличени отбори</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineUser/> {props.allParticipants}</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineTeam/> {props.teams}</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineGift/> {props.valuedProjects}</Text></Box>
            </SimpleGrid>
        </Box>

    )

}

export default Numbers;