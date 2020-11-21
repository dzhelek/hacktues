import About from "./about"
import * as React from "react"
import { Box, Slide, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {Link} from '@chakra-ui/react'
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies();
import Konami from 'react-konami-code';

export default function Home() {

    var router = useRouter()
    const easterEgg = () => {
		router.put("/secret/verywellkeptsecret/indeed/secret")
	}
    return( 
        <Box>
            <Konami code={[71,71,87,80]} action={easterEgg}/>
            <Link isExternal href="https://discord.com/api/oauth2/authorize?client_id=743157046677078016&redirect_uri=https%3A%2F%2Fhacktues-git-wave2.zaharymomchilov.vercel.app%2F&response_type=code&scope=identify" isExternal>
  Discord
</Link>
        </Box>
    );
}