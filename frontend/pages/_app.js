import '../styles/globals.css'
import { ChakraProvider, ThemeProvider } from "@chakra-ui/core"
import { extendTheme } from "@chakra-ui/core";
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'keen-slider/keen-slider.min.css'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'
import jwt_decode from "jwt-decode";

// axios.defaults.xsrfHeaderName = "X-CSRFToken"
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
// axios.defaults.headers.post['X-CSRF-Token'] = response.data._csrf
// const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA0OTM2NzgxLCJqdGkiOiJhMDIxMGJkNzE3Mjk0MDNkYWU3YmM0ZjZkY2M1YmZhYiIsInVzZXJfaWQiOjN9.AnVWwl07Qfg_hdeid8Utoz31XXNn95TGl17lSGMuvF0"
import { createBreakpoints } from "@chakra-ui/theme-tools"

// Then add your custom breakpoints as key-value pairs
const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  x1: "450px",
  x2: "900px"
})
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
		// console.log(true, 'token is not expired')
		// console.log(exp.exp * 1000 - Date.now());
	}
	else { 
	  
		console.log(false, 'token is expired')
		console.log(cookies.get('auth'));
		 axios({
			method: 'post',
			url: 'https://hacktues.pythonanywhere.com/token/',
			header: 'Content-Type: application/json',
			data: {
			"username": "hacktues",
			"password": "Go Green"
		}
		})
		  .then(function (response) {
			  cookies.set('auth', response.data.access, { path: '/' })
			  cookies.set('refresh', response.data.refresh, { path: '/' })
			//   console.log("new auth: " + cookies.get('auth'));
		})
    	
  }}

function MyApp({ Component, pageProps }) {

  	useEffect(() => {
		if(!cookies.get('auth')){
			axios({
				method: 'post',
				url: 'https://hacktues.pythonanywhere.com/token/',
				header: 'Content-Type: application/json',
				data: {
				"username": "hacktues",
				"password": "Go Green"
			}
			})
			  .then(function (response) {
				  cookies.set('auth', response.data.access, { path: '/' })
				  cookies.set('refresh', response.data.refresh, { path: '/' })
			})
		}
		else{
		checkToken(jwt_decode(cookies.get('auth')))
	  }})
        

  	return (
  	<ChakraProvider resetCSS={false} theme={theme}>
  		<Navbar/>
  	  	<Component {...pageProps} />
  	  	<Footer/>
  	</ChakraProvider>) 
}

export default MyApp