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

export default function Discord() {

    useEffect(() => {
        router.prefetch('/secret/verywellkeptsecret/indeed/secret')
      })
    var router = useRouter()
    const easterEgg = () => {
		router.push("/secret/verywellkeptsecret/indeed/secret")
    }

    const CLIENT_ID = '743157046677078016'
    const CLIENT_SECRET = 'zz8dSlB1maL4tUIWDCCLpIpn8MVPYqKP'

    var data= {'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET, 'grant_type': 'authorization_code', 'code': router.query['code'], 'scope': 'identify', 'redirect_uri': 'https://hacktues-git-wave2.zaharymomchilov.vercel.app/', }

    // console.log(router.query['code']);
    if(router.query['code'] != undefined){
    axios({
        method: 'post',
        url: 'https://discord.com/api/oauth2/token',
        headers: 
        { "Content-type": "application/x-www-form-urlencoded"},
        data: data
          },)
        .then(function (response) {
            if(response.status == 201){
                // toast({
                //       title: "Създаване на акаунт",
                //       description: "Акаунтът беше успешно създаден.",
                //       status: "success",
                //       duration: 9000
                //     })
                console.log(response);
            }})
        }
    return( 
        <Box>
            <Link isExternal href='https://discord.com/api/oauth2/authorize?client_id=743157046677078016&redirect_uri=https%3A%2F%2Fhacktues-git-wave2.zaharymomchilov.vercel.app%2F&response_type=code&scope=identify'>xd</Link>            
        </Box>
    );
}

