import { Box, Flex, Text } from "@chakra-ui/core";
import { Tag, TagIcon, TagLabel, TagCloseButton, Icon, Link } from "@chakra-ui/core";

const Card = (props) => {

    var i,j;
    var label = [];

    const labels = [
      { id: 0, label: "Arduino", color: "cyan"}, { id: 1, label: "Apache", color: "green"}, { id: 2, label: "React", color: "orange"}, { id: 3, label: "AngularJS",color: "orange"}, { id: 4, label: "Angular", color: "cyan"},];

    for(i = 0; i < (props.label.length); i++){
        for(j = 0; j < labels.length; j++){
          if(props.label[i] == labels[j].id){
            label.push(<Tag mr="5px" colorScheme={labels[j].color} key={j}><TagLabel fontFamily="Rubik" >{labels[j].label}</TagLabel></Tag>)
      }
    }
  }

    return (
      <Flex width="400px" flexDirection="column" flexWrap="wrap" alignSelf="stretch" h="250px" m="15px" padding="15px" backgroundColor="white" rounded="lg" overflow="hidden">
        <Text mb="0" display="flex" color="black" mt="1" fontWeight="semibold" as="h2">
        {props.name}
        Test
        </Text>
        <Flex flexDirection="row" flexWrap="wrap">{label}</Flex>
        <Flex paddingTop={["10px","10px","10px","25px"]} justifyContent="center" flexDirection="column">
            <Text wordBreak="break-word" m="0" pt={["0","0","0","15px"]} fontWeight="300" as="h3"><strong>Участници: </strong>
            {props.teammates}
            Test peeps
            </Text>
        </Flex>
      </Flex>
    );
}

export default Card;