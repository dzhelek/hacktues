import { Box, Flex, Text, Image } from "@chakra-ui/core";

const Card = (props) => {

	console.log(props);

  var color;
  
	switch(props.position){
	    case 'IT':
	        color = "#FFD700";
	        break;
	    case 'PR':
	        color = "#D7D7D7";
	        break;
	    case 'Спонсори':
	        color = "#A77044";
	        break;
	    case 'Дизайн':
	        color = "#A77044";
		  	break;
		case 'Логистика':
	        color = "#A77044";
		  	break;
		case 'Координатор':
	        color = "#A77044";
		  	break;
		}
    return (
      <Flex h="450px" width="300px" flexDirection="column" flexWrap="wrap" alignSelf="stretch" h="auto" m="15px" padding="15px" rounded="lg" overflow="hidden">
        <Text paddingLeft="10px" display="flex" mt="1" pb="0" mb="0" as="h3">
            {props.name}
        </Text>
        <Image objectFit="contain" width="100%" h="400px" backgroundPosition={["","","",""]} rounded="lg" paddingLeft="10px" mt="0" paddingRight="10px" src={props.picture}/>
        <Flex paddingLeft="10px" justifyContent="center" flexDirection="column">
            <Text wordBreak="break-word" m="0" fontWeight="300" as="h4"><strong>Позиция: </strong>{props.position}</Text>
            <Text wordBreak="break-word" m="0" pt="5px" fontWeight="300" as="h4"><strong>Клас: </strong>{props.class}</Text>
        </Flex>
      </Flex>
    );
}

export default Card;