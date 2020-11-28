import React from 'react'
import { Flex, Text } from "@chakra-ui/react";
import Link from 'next/link';

const Successful = (props) => {
    return(
        <Flex pt="10px" pb="10px" pl="10px" pr="10px" marginLeft="33%" marginRight="33%" marginTop="5%"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <Text alignSelf="center">
                Имейлът Ви е потвърден успешно. <Link href='/login'><a style={{color: "green"}}><u>Продължете към влизане</u></a></Link>
            </Text>
        </Flex>
    );
}

export default Successful;