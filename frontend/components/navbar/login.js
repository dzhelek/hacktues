import { Formik, Field } from 'formik';
import { Button, Input, InputGroup,InputRightElement, useToast } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import Cookies from 'universal-cookie'
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from "@chakra-ui/react"

const cookies = new Cookies();
const axios = require('axios');

export default function Login({logIn}) {
  
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	function handleLog(){
		logIn(true)
	}

	const toast = useToast()
	const router = useRouter()

	return(
	  	<Popover onClose={onClose} autoFocus="false" placement="bottom">
			<PopoverTrigger>
		  		<Button marginLeft={["none","none","none","auto"]} _active={{bg:"transparent"}} _hover={{bg:"transparent"}} cursor="pointer" fontFamily="Rubik" color="white" bg="transparent" _focus={{outline: "none"}} border="0px" borderWidth="0px" >Влез</Button>
			</PopoverTrigger>
			<PopoverContent _focus={{outline:"none"}} color="white" bg="white"  borderColor="#a5cf9f">
		  		<PopoverArrow />
		  			<PopoverBody >
					  <Formik initialValues={{ email: "", password: "" }} 
	onSubmit={(values, actions) => {
		setTimeout(() => {
				var data = JSON.stringify(values, null, 1)
				axios({
					method: 'post',
					url: 'https://hacktues.pythonanywhere.com/token/',
					headers: 
					{ "Content-type": "Application/json"},
					data: data  
					  },)
					.then(function (response) {
						console.log(response);
					  	cookies.set('auth', response.data.access, { path: '/' })
						cookies.set('refresh', response.data.refresh, { path: '/' })
						router.push('/')
						toast({
        					  title: "Влизането успешно.",
        					  description: "Влизането в профила е успешно.",
        					  status: "success",
        					  duration: 9000
        					})
						onClose(true)
					})
					.catch(function (error) {
						if (error.response) {
							toast({
        						title: "Влизането не е успешно.",
        						description: error.response.data.detail,
        						status: "error",
        						duration: 9000
        					})
						}})
								console.log(JSON.stringify(values, null, 1))
								actions.setSubmitting(false)
							}, 1000);
					}}>
{props => (
		<form onSubmit={props.handleSubmit}>
		<Field name="email">
			{({ field, form }) => (
			  	<FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
					<FormLabel color="black" paddingBottom="5px" fontFamily="Rubik" fontSize="15px" htmlFor="text">
							E-mail
					</FormLabel>
					<Input _focus={{outline:"none"}} outline="lightgrey" variant="outline" {...field} id="email1" />
					<FormErrorMessage>{form.errors.email}</FormErrorMessage>
			  	</FormControl>
			)}
		</Field>
			<Field name="password" >
				{({ field, form }) => (
				<FormControl isRequired isInvalid={form.errors.password && form.touched.password}>
					<FormLabel paddingTop="15px" paddingBottom="5px" color="black" fontFamily="Rubik" fontSize="15px" htmlFor="password">
						Парола
					</FormLabel>
					<InputGroup size="md">
						<Input id="password1" pr="4.5rem" type={show ? "text" : "password"} isRequired {...field} isInvalid={form.errors.password && form.touched.password}/>
							<InputRightElement width="4.5rem">
								<Button fontFamily="Rubik" fontSize="15px" border="0" colorScheme="green" _focus={{outline:"none"}} h="1.75rem" size="sm" onClick={handleClick}>
									{show ? <ViewIcon/> : <ViewOffIcon/>}
								</Button>
							</InputRightElement>
						</InputGroup>
				</FormControl>)}
			</Field>
			<Button mt={4} colorScheme="green" border="0" isLoading={props.isSubmitting} type="submit">
				Логин
			</Button>
		</form>
		)}
		</Formik>
			</PopoverBody>
		</PopoverContent>
	</Popover>
	)
}