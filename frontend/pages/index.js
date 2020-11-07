import About from "./about"
import { Box } from "@chakra-ui/core";
import Link from 'next/link'
import Sponsors from "../components/sponsor/sponsor"
import Konami from 'react-konami-code';
import { useRouter } from 'next/router'
import {useEffect} from 'react'

const axios = require('axios');

export default function Home() {

// // Make a request for a user with a given ID
// axios.get('/user?ID=12345')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });

useEffect(() => {
    // .then(response => response.json())
    // .then(data => console.log(data))
    
     const token = Buffer.from(`hacktues:Go Green`, 'utf8').toString('base64')
    
    // fetch("https://hacktues.pythonanywhere.com/",
    //       {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Basic ${token}`,
    //         }
    //       }
    //     )
    //       .then(response => response.json())
    //       .then(data => console.log(data))
    //   })

      axios.get('https://hacktues.pythonanywhere.com/', {
        headers: {
        'Authorization': `Basic ${token}`
        }
    //   })
    // //   .then(function (response) {
    // //     console.log(response);
    // //   })
    // //   .catch(function (error) {
    // //     console.log(error);
    // //   })
    // //   .then(function () {
    // //     // always executed
    // //   }
    //   )
    });

      axios.get('https://hacktues.pythonanywhere.com/teams/', {
        headers: {
        'Authorization': `Basic ${token}`
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      })});


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