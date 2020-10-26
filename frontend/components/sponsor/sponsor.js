import React from 'react';
import { Flex, Box, Button, Text, Link, Image } from "@chakra-ui/core";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import sponsor from "./sponsor.json";
var stringArchive = JSON.stringify(sponsor);
var data = JSON.parse(stringArchive);

const GetSponsors = props => {
    var i
    var day = []
    for(i = 0; i < data.length; i++){
        day.push(<Entry key={i} className={"keen-slider__slide number-slide" + i} id={data[i].id} link={data[i].link} logo={data[i].logo}/>)
        // console.log(data[i].link);
    }
    return day;
}

const Entry = props => {
    return(
    <Flex h="auto" flexDirection="column" flexWrap="wrap" alignSelf="center" marginTop="25px" marginLeft={["5%", "5%", "5%", "35%"]} marginRight={["5%", "5%", "5%", "35%"]} alignSelf="center" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="transparent" >
        <Box order="3" alignSelf="center">
            <Link name={props.id} href={props.link} isExternal>
                <Image objectFit="contain" width="100%" src={props.logo}></Image>
            </Link>
        </Box>
    </Flex>
    );
};

export default function Sponsors(){
    var i
    var xd = []
    for(i = 0; i< GetSponsors().length; i++){
        xd.push(<Slide index={i}>{GetSponsors()[i]}</Slide>)
    }

    return (
      <Box>
            <CarouselProvider isIntrinsicHeight="true" naturalSlideWidth={100} naturalSlideHeight={250} totalSlides={5}>
              <Slider moveThreshold="0.1">
                {xd}
              </Slider>
          <DotGroup/>
        </CarouselProvider>
        </Box>
    );
};