import Lottie from 'react-lottie';
import * as animationData from './anim.json'
import { Box } from "@chakra-ui/core";
import {useRouter} from "next/router"

export default function Home() {

    
    var router = useRouter()

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }}
    
    return( 
        <Box>
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
<lottie-player src="https://assets9.lottiefiles.com/packages/lf20_1q3r6idv.json" background="transparent"  speed="1"  style={{"width": "300px", "height": "300px"}}  loop autoplay></lottie-player>
        </Box>
    );
}
