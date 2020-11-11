import React, {useEffect} from 'react'
import Day from "../components/schedule/day"
import { IoIosLaptop, IoMdPin } from "react-icons/io";
import { Flex, Box, Button} from '@chakra-ui/core'
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import { IconButton } from "@chakra-ui/core"

import Entry from "../components/schedule/entry"
import { useKeenSlider } from 'keen-slider/react'
import {ArrowForwardIcon, ArrowBackIcon} from '@chakra-ui/icons'
var emojiLaptop = <IoIosLaptop/>;
var emojiPin = <IoMdPin/>;
var TechPark = "https://goo.gl/maps/dtZjXyfVKV42cetB9"

const day1 = [
  { title: 'Официално откриване на събитието', notime:0, time1: '17:30', time2:'18:00', link: TechPark, emoji:emojiPin, place:"Sofia Tech Park",}, 
  { title: 'Образователна лекция', notime:0, time1: '18:15', time2: '19:00', link: TechPark, emoji: emojiPin, place:"Sofia Tech Park",}, 
  { title: 'Образователна лекция (онлайн)', notime:0, time1: '19:15', time2: '20:30', link: TechPark, emoji: emojiPin, place:"Sofia Tech Park",},
  { title: 'Образователни уъркшопи', notime:0, time1: '19:15', time2: '20:30', emoji: emojiPin, place:"Sofia Tech Park",},
  { title: 'Образователни уъркшопи', notime:0, time1: '19:15', time2: '20:30', emoji: emojiPin, place:"Sofia Tech Park",},];

const day2 = [
  { title: 'Работа по проектите', notime:1, emoji:emojiLaptop, place:"Онлайн",},];


// export default function Schedule(){
//   return (
//     <Box pb="250px">
//           <CarouselProvider isIntrinsicHeight="true" naturalSlideWidth={150} naturalSlideHeight={150} totalSlides={2}>
//               <Slider moveThreshold="0.2">
//               <Slide index={0}><Day schedule={day1} lenght={day1.length}/></Slide>
//               <Slide index={1}><Day schedule={day2} lenght={day2.length}/></Slide>
//             </Slider>
//             </CarouselProvider>
//       </Box>
//   );
// };

export default function Schedule(){

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const timer = React.useRef();
  const [sliderRef, slider] = useKeenSlider()

  	return (
      <div style={{"position": "relative", "paddingTop":"50px"}} className="navigation-wrapper">
    	<Box paddingBottom={["50px","50px","250px","250px"]} ref={sliderRef} className="keen-slider">
    		<div  className={"keen-slider__slide number-slide1"}>{GetEntry(day1)}</div>
    		<div  className={"keen-slider__slide number-slide2"}>{GetEntry(day2)}</div>
    	</Box>
      {slider && (
        <>
          <ArrowLeft
            onClick={e => e.stopPropagation() || slider.prev()}
            disabled={currentSlide === 0}
          />
          <ArrowRight
            onClick={e => e.stopPropagation() || slider.next()}
            disabled={currentSlide === slider.details().size - 1}
          />
        </>
      )}
      {slider && (
      <Box display={["block", "block", "block", "none"]}>
        <div style={{"justifyContent": "center", "textAlign":"center"}} className="dots">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button style={{"outline":"none","border":"none","width":"10px","height":"10px","background":"#ffff","borderRadius":"50%","margin":"0 5px","padding":"5px","cursor":"pointer", "marginBottom":"250px"}}
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              />
            )
          })}
        </div>
        </Box>
      )}
      </div>
  );
};

function GetEntry(props) {
  let content = [];
    for (let x = 0; x < props.length; x++) { 
        content.push(<Entry key={x} marginTop="25px" notime={props[x].notime} title={props[x].title} time1={props[x].time1} time2={props[x].time2} link={props[x].link} emoji={props[x].emoji} place={props[x].place}/>);
    }
    return content;
}


function ArrowLeft(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <Box left="450px" style={{"height":"250px", "width":"100px", "position":"absolute", "top":"50%", "transform":"translateY(-50%)"}}>
      <IconButton border="0" _focus="outline:none;" display={["none","none","none","none","block"]} size="lg" backgroundColor="white" color="green.500" onClick={props.onClick} className={"arrow arrow--left" + disabeld} icon={<ArrowBackIcon/>} />
    </Box>
  );
}

function ArrowRight(props) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <Box right="450px" style={{"height":"250px", "width":"30px", "position":"absolute", "top":"50%", "left":"auto", "transform":"translateY(-50%)"}}>
    <IconButton border="0" _focus="outline:none;" display={["none","none","none","none","block"]} size="lg" backgroundColor="white" color="green.500" onClick={props.onClick} className={"arrow arrow--left" + disabeld} icon={<ArrowForwardIcon/>} />
  </Box>
  );
}