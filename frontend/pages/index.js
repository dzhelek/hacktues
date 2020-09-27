import Regulation from "./regulation/regulation"
import Schedule from "./schedule/schedule"
import { Box } from "@chakra-ui/core";
import Link from 'next/link'

export default function Home() {
    return(
    <Box>
      <Schedule/>
    </Box>
    
    );
}
