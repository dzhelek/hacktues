
import Lottie from 'react-lottie';
import animationData from './anim.json'
import { Box } from "@chakra-ui/react";
import {useRouter} from "next/router"

export default function Home() {

    
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          autoplay={true}
          height={400}
          width={400}
        />
      </div>
    );
  }

