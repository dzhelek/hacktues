import React from 'react';
import { Flex, Box, Button, Text, Link } from "@chakra-ui/core";

let time;

const Entry = props => (
    <Flex w="300px" h="250px" flexDirection="column" flexWrap="wrap" alignSelf="center" marginTop="25px" marginLeft={["5%", "5%", "5%", "35%"]} marginRight={["5%", "5%", "5%", "35%"]} alignSelf="center" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" >
        <Text fontWeight="400" as="h3" order="1" textAlign="center" alignSelf="center">{props.title}</Text>
        <div>
            {(() => {if(props.notime) time = <Text order="2" textAlign="center" alignSelf="center"></Text>;
                    else time = <Text fontWeight="400" as="h3" order="2" textAlign="center" alignSelf="center">от <strong>{props.time1}</strong> до <strong>{props.time2}</strong></Text>;})()}
        </div>
        {time}
        <Box order="3" alignSelf="center">
            <Link href={props.link} isExternal>
                <Button variant="solid" borderWidth="0px" variantColor="green" size="md" mt="1rem" >{props.emoji}{props.place}</Button>
            </Link>
        </Box>
    </Flex>

);

export default Entry;