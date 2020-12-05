import React from "react";
import { Box, Button, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";

import { Formik, Field, Form } from 'formik';
import { useDisclosure} from "@chakra-ui/react";
const axios = require('axios');
import Cookies from 'universal-cookie';
import { ViewIcon, ViewOffIcon} from '@chakra-ui/icons'

import { useRouter } from "next/router";
import Router from 'next/router'

const cookies = new Cookies();

export default function Login({logIn}) {
	
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	var router = useRouter()
	const toast = useToast()
	return(
		<Box marginLeft="15px" marginRight="15px">
	  	    <Box margin="auto" w={["100%","100%","25%","25%"]} minWidth={["none","none","35rem","35rem"]} backgroundColor="white" p="25px" mt="50px" rounded="lg">
			
	        </Box>
	    </Box>
	)
}