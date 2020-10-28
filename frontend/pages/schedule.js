'use strict';
import React, {useEffect} from 'react'
import Day from "../components/schedule/day"
import { IoIosLaptop, IoMdPin } from "react-icons/io";
import { Flex, Box, SimpleGrid } from '@chakra-ui/core'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import { AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai';
import Swipe from 'react-easy-swipe';

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
  
  
  
  
  
  var lock = true
 function onSwipeStart(events) {
    console.log('Start swiping...', events);
  }

  function onSwipeDown(position, events) {
    // console.log(`Moved ${position.x} pixels horizontally`, events);
    //console.log(`Moved ${position.y} pixels vertically`, events);
    lock = false
  }

  function onSwipeUp(position, events) {
    // console.log(`Moved ${position.x} pixels horizontally`, events);
    //console.log(`Moved ${position.y} pixels vertically`, events);
    lock = false
  }

  function onSwipeEnd(events) {
    console.log('End swiping...', events);
    lock = true
  }


export default function Schedule(){
  return (
    <Box pb="250px">
    <Swipe
        onSwipeUp={onSwipeUp}
        onSwipeDown={onSwipeDown}
        onSwipeEnd={onSwipeEnd}>
          <CarouselProvider touchEnabled={false} isIntrinsicHeight="true" naturalSlideWidth={150} naturalSlideHeight={150} totalSlides={2}>
              <Slider>
              <Slide index={0}><Day schedule={day1} lenght={day1.length}/></Slide>
              <Slide index={1}><Day schedule={day2} lenght={day2.length}/></Slide>
            </Slider>
            <Swipe/>
            </CarouselProvider>
      </Swipe>
      </Box>
  );
};

// tag={"transform": [{ translateX: number }]}}
// onMouseDown = {() => {lock=false}} onMouseUp = {() => {lock=false}}