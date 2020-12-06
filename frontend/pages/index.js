import { useEffect } from "react"
import { Box, Slide, Button } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import {Link} from '@chakra-ui/react'
import Cookies from 'universal-cookie';
import axios from 'axios'
const cookies = new Cookies();
import Konami from 'react-konami-code';

export default function Home() {

    useEffect(() => {
        router.prefetch('/secret/verywellkeptsecret/indeed/secret')
    })

    var router = useRouter()

    const easterEgg = () => {
		  router.push("/secret/verywellkeptsecret/indeed/secret")
    }

    return( 
          <Box>
            <Konami code={[71,71,87,80]} action={easterEgg}/>
          </Box>
    );
}

