import '../styles/globals.css'
import { ThemeProvider } from "@chakra-ui/core"
import { theme } from "@chakra-ui/core";
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'keen-slider/keen-slider.min.css'
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import React, {useEffect} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios'

// axios.defaults.xsrfHeaderName = "X-CSRFToken"
// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
// axios.defaults.headers.post['X-CSRF-Token'] = response.data._csrf
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA0OTM2NzgxLCJqdGkiOiJhMDIxMGJkNzE3Mjk0MDNkYWU3YmM0ZjZkY2M1YmZhYiIsInVzZXJfaWQiOjN9.AnVWwl07Qfg_hdeid8Utoz31XXNn95TGl17lSGMuvF0"
const cookies = new Cookies();

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
			700: "#2a69ac",
    },
  },
};

function MyApp({ Component, pageProps }) {


  useEffect(() => {
		// axios({
		// 	method: 'post',
		// 	url: 'https://hacktues.pythonanywhere.com/token/',
		// 	header: 'Content-Type: application/json',
		// 	data: {
		// 		"username": "hacktues",
		// 	  	"password": "Go Green"
		// 	}
		//   })
		//   	.then(function (response) {
		//     	  cookies.set('auth', response.data.access, { path: '/' })
		//   	})
		//   	.catch(function (error) {
		// 		console.log(error);
		//   	})
		//   	.then(function () {
    //     })
    const token = Buffer.from("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA0OTM2NzgxLCJqdGkiOiJhMDIxMGJkNzE3Mjk0MDNkYWU3YmM0ZjZkY2M1YmZhYiIsInVzZXJfaWQiOjN9.AnVWwl07Qfg_hdeid8Utoz31XXNn95TGl17lSGMuvF0", 'utf8').toString('base64')
        // var token = cookies.get('auth')
        // console.log("auth:" + token);
        axios({
          method: 'get',
          url: 'https://hacktues.pythonanywhere.com/users/',
          header: 
          { "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`} ,
          data: {"xd":"xd"},
            })
            .then(function (response) {
                console.log(response);
              // cookies.set('auth1', response.data.access, { path: '/' })
            })
            .catch(function (error) {
            console.log(error);
            })
            .then(function () {
          console.log(cookies.get('auth'))
            })})

  return (
   <ThemeProvider theme={customTheme}>
    <Navbar/>
    <Component {...pageProps} />
    <Footer/>
   </ThemeProvider>) 
}

export default MyApp
