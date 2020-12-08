import React from 'react';
import { Flex, Box, IconButton, Button, Text, Link, Image } from "@chakra-ui/core";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import sponsor from "./sponsor.json";
var stringArchive = JSON.stringify(sponsor);
var data = JSON.parse(stringArchive);

import { useDisclosure } from "@chakra-ui/core";

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
  } from "@chakra-ui/core";

import { useEffect } from 'react'

import { useKeenSlider } from 'keen-slider/react'

const GetPacket = props => {
	var i
	var packets = []
	for (i = 0; i < data[i].length; i++){
		packets.push(data[i].packet)
	}
	console.log(packets);
	return packets;
}

const GetSponsors = props => {
    var i
    var day = []
    for(i = 0; i < data.length; i++){
        day.push(<Entry key={i} className={"keen-slider__slide number-slide" + i} packet={data[i].packet} id={data[i].id} link={data[i].link} logo={data[i].logo}/>)
        // console.log(data[i].packet);
    }
    return day;
}

const Entry = props => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	var packet;
    return(
    <Flex h="250px" flexDirection="column" flexWrap="wrap" alignSelf="center" marginTop="25px" ml="15%" mr="15%" alignSelf="center" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" >
		<Box p="15px" order="3" alignSelf="center">
            <Link name={props.id} href={props.link} isExternal>
                <Image h="100px" objectFit="contain" width="100%" src={props.logo}></Image>
            </Link>
        </Box>
		<IconButton outline="none" border="0" _focus={{outline:"none"}}  aria-label="Search database" icon="search" backgroundColor="transparent" onClick={onOpen}/>
		<div className="packet">
            {(() => {
				if(props.packet == "alpha" ){
					packet = <Modal isOpen={isOpen} onClose={onClose}><ModalContent>
        			  <ModalHeader backgroundColor="red" fontFamily="Rubik">Alpha</ModalHeader>
        			  <ModalCloseButton _focus={{outline:"none"}} backgroundColor="transparent" border="0" />
        			  <ModalBody backgroundColor="red">
        			    <Text>3 kila banani</Text>
        			  </ModalBody>
        			</ModalContent></Modal>;
				}
                else if(props.packet == "beta")
					{packet = <Modal isOpen={isOpen} onClose={onClose}><ModalContent>
        			  <ModalHeader fontFamily="Rubik">Beta</ModalHeader>
        			  <ModalCloseButton _focus={{outline:"none"}} backgroundColor="transparent" border="0" />
        			  <ModalBody>
        			    <Text> 2 kila banani</Text>
        			  </ModalBody>
        			</ModalContent></Modal>; 
					}
					else if(props.packet == "gamma")
					{packet = <Modal isOpen={isOpen} onClose={onClose}><ModalContent>
        			  <ModalHeader fontFamily="Rubik">Gamma</ModalHeader>
        			  <ModalCloseButton _focus={{outline:"none"}} backgroundColor="transparent" border="0" />
        			  <ModalBody>
        			    <Text> 1 kilo banani ;)</Text>
        			  </ModalBody>
        			</ModalContent></Modal>; 
					}
					
					})()}
		</div>
		{packet}
    </Flex>
    );
};

export default function Sponsors(){
    var i
    var xd = []
    for(i = 0; i< GetSponsors().length; i++){
        xd.push(<div key={i} className="keen-slider__slide">{GetSponsors()[i]}</div>)
    }

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const timer = React.useRef();
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    }
  });

  React.useEffect(() => {
    sliderRef.current.addEventListener("mouseover", () => {
      setPause(true);
    });
    sliderRef.current.addEventListener("mouseout", () => {
      setPause(false);
    });
  }, [sliderRef]);

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 4000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

    // var i
    // var day = []
    // for(i = 0; i < data.length; i++){
    //     <Entry key={i} className={"keen-slider__slide number-slide" + i} id={data[i].id} link={data[i].link} logo={data[i].logo}/>
    //     //console.log(data[i].link);
    // }

    return (
    <Box>
    <div style={{"position": "relative", "backgroundColor":"white", "marginLeft":"150px", "marginRight":"150px", "marginTop":"20px"}} className="navigation-wrapper">
      <div ref={sliderRef}  className="keen-slider">
            {xd}
        </div>
        {slider && (
            <>
              <ArrowLeft
                onClick={e => e.stopPropagation() || slider.prev()}
                disabled={currentSlide === 0}
              />
              <ArrowRight h="10px" w="10px"
                onClick={e => e.stopPropagation() || slider.next()}
                disabled={currentSlide === slider.details().size - 1}
              />
            </>
          )}
        </div>
        </Box>
    );
};

function ArrowLeft(props) {
    const disabeld = props.disabled ? " arrow--disabled" : "";
    return (
    <div style={{"height":"20px", "width":"20px", "position":"absolute", "top":"50%", "left":"5px", "transform":"translateY(-50%)"}}>
      <svg
        onClick={props.onClick}
        className={"arrow arrow--left" + disabeld}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      </svg>
      </div>
    );
  }
  
  function ArrowRight(props) {
    const disabeld = props.disabled ? " arrow--disabled" : "";
    return (
        <div style={{"height":"20px", "width":"20px", "position":"absolute", "top":"50%", "right":"5px", "left":"auto", "transform":"translateY(-50%)"}}>
      <svg 
        onClick={props.onClick}
        className={"arrow arrow--right" + disabeld}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      </svg>
      </div>
    );
  }