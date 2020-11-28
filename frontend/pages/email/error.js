import React from 'react'
import { Flex, Text } from "@chakra-ui/react";
import Link from 'next/link';

const Error = (props) => {
    return(
        <Flex pt="10px" pb="10px" pl="10px" pr="10px" marginLeft="33%" marginRight="33%" marginTop="5%"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <Text alignSelf="center">
                Възникна проблем с потвържаването на имейлът Ви. Този линк вече е използван.
            </Text>
            <Text alignSelf="center">
            Можете да влезнете <Link href='/login'><a style={{color: "green"}}><u>тук</u></a></Link>
            </Text>
        </Flex>
    );
}

export default Error;