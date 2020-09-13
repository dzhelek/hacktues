import { Box } from "@chakra-ui/core";
import { Image } from "@chakra-ui/core";
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
      <Box padding = "3%" backgroundColor={color} height="auto" borderColor="black" borderWidth="10px" rounded="lg" overflow="hidden">
        <Text color="black" mt="1" fontWeight="semibold" as="h2" lineHeight="tight">
            {emoji}{props.name}
        </Text>
        <Image maxW="100%" height="auto" paddingLeft="1%" paddingRight="1%" src={props.img}/>
        <Box p="1">
            <Box mt="1" fontWeight="normal" as="h4" lineHeight="tight">
                <strong>Участници: </strong>{props.teammates}
            </Box>
            <Box mt="1" fontWeight="normal" as="h4" lineHeight="tight">
                <strong>Проект: </strong>{props.project}
            </Box>
        </Box>
      </Box>
    );
}

export default Card;