//import Regulation from "./regulation/regulation"
//import Schedule from "./schedule/schedule"
import About from "./about"
import { Box } from "@chakra-ui/core";
import Link from 'next/link'
import Sponsors from "../components/sponsor/sponsor"
import Konami, {useKonami} from 'react-konami-code';
import { useRouter } from 'next/router'

import Lottie from 'react-lottie';
import * as animationData from './anim.json'

export default function Home() {

    var router = useRouter()
    const easterEgg = () => {
        router.push("/secret/verywellkeptsecret/indeed/secret")
    };

    return( 
        <Box>
            <Sponsors/>
            <Konami code={[71,71,87,80]} action={easterEgg}/>
            </Box>
    );
}
