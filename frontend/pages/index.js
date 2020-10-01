import Regulation from "./regulation/regulation"
import Schedule from "./schedule/schedule"
import About from "./about/about"
import { Box } from "@chakra-ui/core";
import Link from 'next/link'

export default function Home() {
    return(
    <Box>
      <About/>
    </Box>
    
    );
}
