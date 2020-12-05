import { useEffect } from "react"
import { Box, Slide, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {Link} from '@chakra-ui/react'
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies();
import Konami from 'react-konami-code';
var FormData = require('form-data');


export default function Discord() {


    if(router.query['code'] != undefined){
        let payload = new FormData();
        payload.append("client_id",CLIENT_ID)
        payload.append("client_secret",CLIENT_SECRET)
        payload.append("grant_type",'authorization_code')
        payload.append("redirect_uri",'https://hacktues-git-wave2.zaharymomchilov.vercel.app/registration/discord')
        payload.append("code", router.query['code'])
        payload.append("scope","identify email")

    axios({
        method: 'post',
        url: 'https://discord.com/api/oauth2/token',
        headers: 
        { "Content-type": "application/x-www-form-urlencoded"},
        data: payload
          },)
        .then(function (response) {

            cookies.set('discord_auth', response.data.access_token, { path: '/' })
            cookies.set('discord_refresh', response.data.refresh_token, { path: '/' })

            axios({
                method: 'get',
                url: 'https://discordapp.com/api/users/@me',
                headers: 
                {
                  "Authorization": `Bearer ${response.data.access_token}`}},)
                .then(function (response){
                    console.log(response);
                    axios({
                        method: 'get',
                        url: `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png`,
                        },)
                        .then(function (response){
                            console.log(response.config.url);
                        })
                  })
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                    }
            })
        }

    return( 
        <Box>
            <Link isExternal href='https://discord.com/api/oauth2/authorize?client_id=743157046677078016&redirect_uri=https%3A%2F%2Fhacktues-git-wave2.zaharymomchilov.vercel.app%2F&response_type=code&scope=identify'>xd</Link>            
        </Box>
    );
}

