import React from 'react'
import { Flex, Text } from "@chakra-ui/core";
import Card from '../components/about/card'
import archive from "./about.json";

var stringArchive = JSON.stringify(archive);
var data = JSON.parse(stringArchive);


const GetCards = (props) =>{

    var i,j
    var cards = []
    var counter = 0
    for(i = 0; i < props.length; i++){
        for(j = 0; j < props[i].winners.length; j++){
            counter++
            // if(props[i].id == props[i + 1].id){
                cards.push(<Card key={counter} position={props[i].id} picture={props[i].winners[j].picture} name={props[i].winners[j].name} class={props[i].winners[j].class}/>)
                
            // }
            // console.log(props[i+1].id);
        }
    }

    return cards
}

const Panel = (props) => {
    return(
        <Flex flexDirection="column" flexWrap="wrap" paddingBottom={["160px", "160px", "150px", "150px"]}>
        <Flex display="block" pt="10px" pl="10px" pr="10px" marginLeft={["10%", "10%", "100px", "100px"]} marginRight={["10%", "10%", "100px", "100px"]} marginTop="5%"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <Text paddingLeft="10px">
            <span style={{"font-size":"25px","fontFamily":"llpixel"}}>Hack&nbsp;</span>
                <span style={{"font-size":"25px","font-family":"llpixel","color":"green"}}>
                    TUES
                </span>&nbsp;
                 е първият и единствен по рода си хакатон в България, организиран от ученици за ученици. Събитието стартира през 2015г. като инициатива на ученици от &nbsp;
                <a style={{"color":"green"}} href="http://tues.bg/">Технологично училище „Електронни системи“ към ТУ - София</a>
                , като 5 издания по-късно, Hack TUES е вече едно от ключовите събития за училището. В хакатона могат да участват само ученици от ТУЕС в отбори с три до пет участници, които в рамките на два дни създават от нулата свой ИТ проект по зададена тема и след това го представят пред професионално жури от преподаватели и ИТ специалисти.
                <br></br><br></br>Хакатонът дава възможност на учениците да усъвършенстват уменията си по програмиране, работа в екип и презентация на готовия проект. Те се срещат с ментори от реалния ИТ бизнес, като понякога тези познанства прерастват в предложения за практика и стаж.
<br></br><br></br>Всяка година Hack TUES се организира от координационен екип доброволци от 11-ти клас, който се грижи за цялостната организация на събитието под менторството на АЗТУЕС и ръководството на ТУЕС.
&nbsp;<br></br><br></br><b>Поради</b>&nbsp;наложеното извънредно положение в страната заради COVID-19 пандемията, тазгодишното издание на Hack TUES 6, първоначално планирано за 12-15 март, се отлага за 1-11 октомври.
            </Text>
        </Flex>
        <Flex rounded="lg" marginTop="5%" backgroundColor="white" marginLeft={["10%", "10%", "100px", "150px"]} marginRight={["10%", "10%", "100px", "150px"]} alignSelf="stretch" justifyContent="center" flexDirection="row" flexWrap="wrap">
            {GetCards(data)}
        </Flex>
        </Flex>
    );
}

export default Panel;