
import { Box, Button, Flex, Text, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Icon, Select, Switch, useToast, Checkbox, Link } from "@chakra-ui/react";
import { Formik, Field } from 'formik';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
 } from "@chakra-ui/react";
const axios = require('axios');
import Cookies from 'universal-cookie';
import {PhoneIcon, ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import { useRouter } from "next/router";
const cookies = new Cookies();
import * as Yup from 'yup';
import { useDisclosure } from "@chakra-ui/react"
import styled from '@emotion/styled'

export default function Register(props) {

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	var router = useRouter()

    return (
      <Flex margin="auto" marginLeft="15px" marginRight="15px" paddingBottom="200px">
        <Flex flexDirection="column" flexWrap="wrap" margin="auto" backgroundColor="white" margin="auto" marginTop="50px" padding="20px" rounded="lg" w={["100%","100%","33%","33%"]} minWidth={["none","none","55rem","55rem"]}>
			<Text fontSize="15px" mt={0}>Първата стъпка от регистрацията е влизане, чрез Discord</Text>
            <Button margin="auto" size="lg" border={0} color="white" backgroundColor="#7289da" ><Link isExternal href='https://discord.com/api/oauth2/authorize?client_id=743157046677078016&redirect_uri=https%3A%2F%2Fhacktues-git-wave2.zaharymomchilov.vercel.app%2Fregistration%2Fsecond_step&response_type=code&scope=identify%20email'><a>Login with Discord</a></Link></Button>
	    </Flex>
      </Flex>
    );
}