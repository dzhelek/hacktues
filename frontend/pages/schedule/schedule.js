import React from 'react'
import Day from "../../components/schedule/day"
import { IoIosLaptop, IoMdPin } from "react-icons/io";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

var emojiLaptop = <IoIosLaptop/>;
var emojiPin = <IoMdPin/>;
var TechPark = "https://goo.gl/maps/dtZjXyfVKV42cetB9"

const day1 = [
  { title: 'Официално откриване на събитието', notime:0, time1: '17:30', time2:'18:00', link: TechPark, emoji:emojiPin, place:"Sofia Tech Park",}, 
  { title: 'Образователна лекция', notime:0, time1: '18:15', time2: '19:00', link: TechPark, emoji: emojiPin, place:"Sofia Tech Park",}, 
  { title: 'Образователна лекция (онлайн)', notime:0, time1: '19:15', time2: '20:30', link: TechPark, emoji: emojiPin, place:"Sofia Tech Park",},
  { title: 'Образователни уъркшопи', notime:0, time1: '19:15', time2: '20:30', emoji: emojiPin, place:"Sofia Tech Park",},
  {title: 'Образователни уъркшопи', notime:0, time1: '19:15', time2: '20:30', emoji: emojiPin, place:"Sofia Tech Park",},];

const day2 = [
  { title: 'Работа по проектите', notime:1, emoji:emojiLaptop, place:"Онлайн",},];

export default function Schedule(){
  return (
      <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={400} totalSlides={3}>
        <Slider lockOnWindowScroll="true" moveThreshold="0.2">
          <Slide index={0}><Day schedule={day1} lenght={day1.length}/></Slide>
          <Slide index={1}><Day schedule={day2} lenght={day2.length}/></Slide>
        </Slider>
      </CarouselProvider>
  );
};