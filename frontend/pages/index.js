//import Regulation from "./regulation/regulation"
//import Schedule from "./schedule/schedule"
import About from "./about"
import { Box } from "@chakra-ui/core";
import Link from 'next/link'
import Sponsors from "../components/sponsor/sponsor"
import Konami, {useKonami} from 'react-konami-code';
import { useRouter } from 'next/router'


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