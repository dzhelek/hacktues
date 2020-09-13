import React from 'react'
import { Box, SimpleGrid, Text } from "@chakra-ui/core";

const Numbers = (props) => {

    return(
        <Box>
            <SimpleGrid columns="3">
                <Box><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h3" lineHeight="tight">Участници</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h3" lineHeight="tight">Отбори</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" fontWeight="semibold" as="h3" lineHeight="tight">Отличени отбори</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" mt="1" fontWeight="semibold" as="h1" lineHeight="tight">{props.allParticipants}</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" mt="1" fontWeight="semibold" as="h1" lineHeight="tight">{props.teams}</Text></Box>
                <Box><Text textAlign="center" top="50%" left="50%" color="black" mt="1" fontWeight="semibold" as="h1" lineHeight="tight">{props.valuedProjects}</Text></Box>
            </SimpleGrid>
        </Box>

    )

}

export default Numbers;