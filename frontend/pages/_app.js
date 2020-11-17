import '../styles/globals.css'
import { ChakraProvider, Box, Slide,SlideFade, Button, Text, Link, Flex } from "@chakra-ui/core"
import { extendTheme } from "@chakra-ui/core";
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'keen-slider/keen-slider.min.css'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { useControllableState } from "@chakra-ui/core"

const cookies = new Cookies();

const theme = extendTheme({
	styles: {
	  global: {
		body: {
		  bg: ("https://hacktues.pythonanywhere.com/static/frontend/background.png"),
		},
		},
	  },
	})

function checkToken(exp) {
    if (Date.now() <= exp.exp * 1000) {
		console.log(true, 'token is not expired')
		// console.log(exp.exp * 1000 - Date.now());
		// console.log(cookies.get('auth'));
		// console.log(jwt_decode(cookies.get('auth')).user_id);
		// getUsers()
	}
	else{
		console.log(false, 'token is expired')
		// console.log(cookies.get('auth'));
		getNewToken()
	}
}

function MyApp({ Component, pageProps }) {

	const [logged, setLogin] = useControllableState({defaultValue:0})

  	useEffect(() => {
		if(cookies.get('CookieConsent')){
			if(cookies.get('auth')){
			// console.log(cookies.get('auth'));
				checkToken(jwt_decode(cookies.get('auth')))
				if(jwt_decode(cookies.get('auth')).user_id != 3){
					setLogin(1)
					// getUsers()
			}
		}
		else{
			getNewToken();
			setLogin(0)
			// getUsers()
		}
	}})

  	return (
  	<ChakraProvider resetCSS={false} theme={theme}>
  		<Navbar loggedin={logged} />
  	  	<Component {...pageProps} />
			<Cookie></Cookie>
  	  	<Footer/>
  	</ChakraProvider>) 
}

const Cookie = ({cookieConsent}) => {
	
	const [value, setValue] = useControllableState({defaultValue: true})
	
	function cookieConsentHandler(){
		cookies.set('CookieConsent', true, { path: '/', maxAge: 604800});
	}

	if(!cookies.get('auth')){
		if(!cookies.get('CookieConsent')){
		return(
			<Slide direction="bottom" in={value} style={{zIndex:10, bottom: "100px"}}>
				<Flex flexDirection="row" flexWrap="wrap" p="40px" color="white" mt="4" mr="50px" ml="50px" rounded="lg" bg="#a5cf9f" shadow="md">
					<Text>Съгласявам се с <Link>Terms of Service</Link> на HackTUES 7</Text>
					<Button ml="auto" border="0" colorScheme="white" backgroundColor="transparent" onClick={() => {setValue(false); cookieConsentHandler();getNewToken()}}>Съгласявам се</Button>
				</Flex>
			</Slide>
		)
		
	}
}
	return(<Box display="none">{"xd"}</Box>)
}


function getNewToken() {
	axios({
		method: 'post',
		url: 'https://hacktues.pythonanywhere.com/token/',
		header: 'Content-Type: application/json',
		data: {"email": "hacktues","password": "Go Green"}
	})
	.then(function (response) {
		cookies.set('auth', response.data.access, { path: '/' })
		cookies.set('refresh', response.data.refresh, { path: '/' })
	})
}

function getUsers() {
	axios({
		method: 'get',
		url: 'https://hacktues.pythonanywhere.com/users/',
		headers: 
		{ "Content-type": "Application/json",
		  "Authorization": `Bearer ${cookies.get('auth')}`}
		  },)
		.then(function (response){
			console.log(response);
		})
}

export default MyApp
