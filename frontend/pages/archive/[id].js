import React from 'react'
import { Flex, Box, Text } from '@chakra-ui/react'
import Card  from "../../components/archive/card"
import About  from "../../components/archive/about"
import Numbers  from "../../components/archive/numbers"
import archive from "./archive.json";
import { AiOutlineTeam, AiOutlineUser, AiOutlineGift} from 'react-icons/ai';

var data = JSON.parse(JSON.stringify(archive));

const Hacktues = ({currData}) => {     
    return(
    <Flex display="block" width="100%" flexDirection="column" flexWrap="wrap" pb="150px" pt="50px" justifyContent="center" paddingLeft={["auto","auto","100px","200px"]} paddingRight={["auto","auto","100px","200px"]} borderColor="black">
        <Flex flexDirection={["column","column","column", "row"]} flexWrap="wrap">
                <Card img={currData.winners[0].image} name={currData.winners[0].name} teammates={currData.winners[0].participants} place={currData.winners[0].place} project={currData.winners[0].project}/>
                <Card img={currData.winners[1].image} name={currData.winners[1].name} teammates={currData.winners[1].participants} place={currData.winners[1].place} project={currData.winners[1].project}/>
                <Card img={currData.winners[2].image} name={currData.winners[2].name} teammates={currData.winners[2].participants} place={currData.winners[2].place} project={currData.winners[2].project}/>
        </Flex>
        <Flex flexDirection={["column","column","column", "row"]} flexWrap="wrap">
                <Flex flex="1 1" flexDirection="column" flexWrap="wrap" justifyContent="center">
                <Text textAlign="center" color="black" mt="1" p="10px" as="h2">Участници</Text>
                <Text textAlign="center" color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineUser/> {currData.allParticipants}</Text>
                </Flex>
                <Flex flex="1 1" flexDirection="column" flexWrap="wrap" justifyContent="center">
                <Text textAlign="center" color="black" mt="1" p="10px" as="h2">Отбори</Text>
                <Text textAlign="center"  color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineGift/> {currData.valuedProjects}</Text>
                </Flex>
                <Flex flex="1 1" flexDirection="column" flexWrap="wrap" justifyContent="center">
                <Text textAlign="center" color="black" mt="1" p="10px" as="h2">Отличени отбори</Text>
                <Text textAlign="center"  color="black" fontWeight="semibold" as="h1" fontWeight="400" ><AiOutlineTeam/> {currData.teams}</Text>
                </Flex>
        </Flex>
        {/* <Numbers padding="1%" allParticipants={currData.allParticipants} teams={currData.teams} valuedProjects={currData.valuedProjects}/> */}
        <About description={currData.description}/>
    </Flex>
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

