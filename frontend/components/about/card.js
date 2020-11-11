
import { Box, Flex, Text } from "@chakra-ui/core";

const Card = (props) => {

    return (
      <Flex flexDirection="column" flexWrap="wrap" alignSelf="stretch" flex="1 1" h="auto" m="15px" padding="15px" backgroundColor={color} rounded="lg" overflow="hidden">
        <Text display="flex" color="black" mt="1" fontWeight="semibold" as="h2">
            {props.name}
        </Text>
        <Box minH="250px" backgroundPosition={["","","",""]} rounded="lg" paddingLeft="10px" paddingTop="10px" paddingRight="10px" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center" backgroundImage={"url(" + props.img + ")"}/>
        <Flex paddingTop={["10px","10px","10px","25px"]} justifyContent="center" flexDirection="column">
            <Text wordBreak="break-word" m="0" pt={["0","0","0","15px"]} fontWeight="300" as="h3"><strong>Позиция: </strong>{props.position}</Text>
            <Text wordBreak="break-word" m="0" pt={["5px","5px","10px","15px"]} fontWeight="300" as="h3"><strong>Клас: </strong>{props.class}</Text>
        </Flex>
      </Flex>
    );
}

export default Card;