import React from 'react'
import { Box } from "@chakra-ui/core";
import Day from "../../components/schedule/day"
import { IoIosLaptop, IoMdPin } from "react-icons/io";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

var emojiLaptop = <IoIosLaptop/>;
var emojiPin = <IoMdPin/>;
var TechPark = "https://goo.gl/maps/dtZjXyfVKV42cetB9"

const day1 = [
  { title: 'Официално откриване на събитието', time1: '17:30', time2:'18:00', link: TechPark, emoji:emojiPin, place:"Sofia Tech Park",}, 
  { title: 'Образователна лекция', time1: '18:15', time2: '19:00', link: TechPark, emoji: emojiPin, place:"Sofia Tech Park",}, 
  { title: 'Образователна лекция (онлайн)', time1: '19:15', time2: '20:30', link: TechPark, emoji: emojiPin, place:"Sofia Tech Park",},
  { title: 'Образователни уъркшопи', time1: '19:15', time2: '20:30', emoji: emojiPin, place:"Sofia Tech Park",},];

export default function Schedule(){
  return (
      <div>
        <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={3}>
        <Slider>
          <Slide index={0}><Day schedule={day1} lenght={day1.length} /></Slide>
          <Slide index={2}>I am the third Slide.</Slide>
        </Slider>
        </CarouselProvider>
        </div>
      );
};