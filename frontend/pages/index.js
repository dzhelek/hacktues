import About from "./about"
import { useEffect } from "react"
import { Box, Slide, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {Link} from '@chakra-ui/react'
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies();
import Konami from 'react-konami-code';

const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();


var DiscordStrategy = require('passport-discord').Strategy;

export default function Home() {

    useEffect(() => {
        router.prefetch('/secret/verywellkeptsecret/indeed/secret')
      })
    var router = useRouter()
    const easterEgg = () => {
		router.push("/secret/verywellkeptsecret/indeed/secret")
    }

    console.log(router.query);


    return( 
        <Box>
            <Konami code={[71,71,87,80]} action={easterEgg}/>
            <Link isExternal href='https://discord.com/api/oauth2/authorize?client_id=743157046677078016&redirect_uri=https%3A%2F%2Fhacktues-git-wave2.zaharymomchilov.vercel.app%2F&response_type=code&scope=identify'>xd</Link>            
        </Box>
    );
}

