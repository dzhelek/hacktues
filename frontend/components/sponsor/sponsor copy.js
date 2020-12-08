// import React from 'react';
// import { Flex, Box, Button, Text, Link, Image } from "@chakra-ui/core";
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
// import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
// import sponsor from "./sponsor.json";
// var stringArchive = JSON.stringify(sponsor);
// var data = JSON.parse(stringArchive);

// const GetSponsors = props => {
//     var i
//     var day = []
//     for(i = 0; i < data.length; i++){
//         day.push(<Entry key={i} className={"keen-slider__slide number-slide" + i} id={data[i].id} link={data[i].link} logo={data[i].logo}/>)
//         // console.log(data[i].link);
//     }
//     return day;
// }

// const Entry = props => {
//     return(
//     <Flex h="150px" flexDirection="column" flexWrap="wrap" alignSelf="center" marginTop="25px" marginLeft={["5%", "5%", "5%", "35%"]} marginRight={["5%", "5%", "5%", "35%"]} alignSelf="center" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" >
//         <Box p="15px" order="3" alignSelf="center">
//             <Link name={props.id} href={props.link} isExternal>
//                 <Image h="100px" objectFit="contain" width="100%" src={props.logo}></Image>
//             </Link>
//         </Box>
//     </Flex>
//     );
// };

// export default function Sponsors(){
//     var i
//     var xd = []
//     for(i = 0; i< GetSponsors().length; i++){
//         xd.push(<Slide index={i}>{GetSponsors()[i]}</Slide>)
//     }

//     return (
//       <Flex marginTop="20px" background="white" pr="10%" pl="10%">
//             <CarouselProvider style={{"display":"flex", "flex-direction":"row", "flex-wrap":"nowrap","padding":"15%"}} isPlaying={true} infinite={true} interval={2000} isIntrinsicHeight="true" naturalSlideWidth={100} naturalSlideHeight={250} totalSlides={5}>
//             <ButtonBack style={{"backgroundColor":"transparent", "border":"0", "outline":"none" }}><AiOutlineArrowLeft/></ButtonBack>
//               <Slider moveThreshold="0.1">
//                 {xd}
//               </Slider>
//         <ButtonNext style={{"backgroundColor":"transparent", "border":"0", "outline":"none"}}><AiOutlineArrowRight/></ButtonNext>
//         </CarouselProvider>
//         </Flex>
//     );
// };