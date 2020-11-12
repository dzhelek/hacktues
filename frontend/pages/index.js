import About from "./about"
import * as React from "react"
import { Box, Slide, Button } from "@chakra-ui/core";
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies();
import { useControllableState } from "@chakra-ui/core"
import Konami from 'react-konami-code';

function getNewToken() {
	axios({
		method: 'post',
		url: 'https://hacktues.pythonanywhere.com/token/',
		header: 'Content-Type: application/json',
		data: {"username": "hacktues","password": "Go Green"}
	})
	.then(function (response) {
		cookies.set('auth', response.data.access, { path: '/' })
		cookies.set('refresh', response.data.refresh, { path: '/' })
		//   console.log("new auth: " + cookies.get('auth'));
	}
	)
}

export default function Home() {

    var router = useRouter()
    const easterEgg = () => {
        router.push("/secret/verywellkeptsecret/indeed/secret")
    };

    return( 
        <Box>
            {/* <Sponsors/> */}
            <Konami code={[71,71,87,80]} action={easterEgg}/>
        </Box>
    );
}