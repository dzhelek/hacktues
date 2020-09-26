import { Box } from "@chakra-ui/core";
import { Text } from "@chakra-ui/core";

const Card = (props) => {

    var color;
    var emoji;
    
    switch(props.place){
        case 'first':
            color = "#FFD700";
            emoji = <span role="medal">🥇</span>;
            break;
        case 'second':
            color = "#D7D7D7";
            emoji = <span role="medal">🥈</span>;
            break;
        case 'third':
            color = "#A77044";
            emoji = <span role="medal">🥉</span>;
            break;
    }

    return (
      <Box flex-flow="column wrap" justifyContent="flex-start" alignSelf="stretch" flex="1 1" h="500px" margin="2%" padding = "1%" backgroundColor={color} rounded="lg" overflow="hidden">
        <Text  color="black" mt="1" fontWeight="semibold" as="h2" lineHeight="tight">
            {emoji}{props.name}
        </Text>
        <Box rounded="lg" w="100%" h="250px" margin="1%" padding="1%" backgroundRepeat="no-repeat" backgroundSize="cover" backgroundPosition="center" backgroundImage={"url(" + props.img + ")"}/>
        <Box p="1%">
            <Box mt="1%" fontWeight="normal" as="h4" lineHeight="tight">
                <Text fontWeight="400" as="h3"><strong>Участници: </strong>{props.teammates}</Text>
            </Box>
            <Box fontWeight="normal" as="h4" lineHeight="tight">
                <Text fontWeight="400" as="h3"><strong>Проект: </strong>{props.project}</Text>
            </Box>
        </Box>
      </Box>
    );
}

export default Card;