import React from 'react'
import { Flex, Box, SimpleGrid } from '@chakra-ui/core'
import Card  from "../../components/archive/card"
import About  from "../../components/archive/about"
import Numbers  from "../../components/archive/numbers"
import archive from "./archive.json";

var stringArchive = JSON.stringify(archive);
var data = JSON.parse(stringArchive);

const Hacktues = ({currData}) => {     
    return(
    <Box padding="15%"   backgroundColor="white" borderColor="black">
        <Flex flexDirection={["column","column","column", "row"]} flex-flow="column wrap" justify="space-around">
                <Card img={currData.winners[0].image} name={currData.winners[0].name} teammates={currData.winners[0].participants} place={currData.winners[0].place} project={currData.winners[0].project}/>
                <Card img={currData.winners[1].image} name={currData.winners[1].name} teammates={currData.winners[1].participants} place={currData.winners[1].place} project={currData.winners[1].project}/>
                <Card img={currData.winners[2].image} name={currData.winners[2].name} teammates={currData.winners[2].participants} place={currData.winners[2].place} project={currData.winners[2].project}/>
        </Flex>
        <Numbers padding="1%" allParticipants={currData.allParticipants} teams={currData.teams} valuedProjects={currData.valuedProjects}/>
        <About description={currData.description}/>
    </Box>
)};

export const getStaticPaths = async () => {
    const paths = data.map((data) => ({
      params: { id: data.id },
    }))
    return { paths, fallback: false }
  }

export const getStaticProps = async (ctx) => {
    const currData = data.find((data) => data.id == ctx.params.id )
    return { props: { currData } }
}

export default Hacktues;

