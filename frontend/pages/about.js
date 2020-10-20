import React from 'react'
import { Box, Flex } from "@chakra-ui/core";
import { Text } from '@chakra-ui/core'


const Panel = (props) => {
    return(
        <Flex margin="0 auto" marginLeft={["10%", "10%", "100px", "100px"]} marginRight={["10%", "10%", "100px", "100px"]} marginTop="10%"  flexDirection="column" flexWrap="wrap" justifyContent="center" height="auto" borderColor="black" borderWidth="10px" rounded="lg" backgroundColor="white" overflow="hidden">
            <Text textAlign="left" paddingLeft="10px" color="black" mt="0" mb="0" as="h2">
                За Hack TUES
            </Text>
            <Text paddingLeft="10px">
                Hack&nbsp;
                <span style={{"font-family":"llpixel","color":"green"}}>
                    TUES&nbsp;
                </span>
                 е първият и единствен по рода си хакатон в България, организиран от ученици за ученици. Събитието стартира през 2015г. като инициатива на ученици от &nbsp;
                <a style={{"color":"green"}} href="http://tues.bg/">Технологично училище „Електронни системи“ към ТУ - София</a>
                , като 5 издания по-късно, Hack TUES е вече едно от ключовите събития за училището. В хакатона могат да участват само ученици от ТУЕС в отбори с три до пет участници, които в рамките на два дни създават от нулата свой ИТ проект по зададена тема и след това го представят пред професионално жури от преподаватели и ИТ специалисти.

                <br></br><br></br>Хакатонът дава възможност на учениците да усъвършенстват уменията си по програмиране, работа в екип и презентация на готовия проект. Те се срещат с ментори от реалния ИТ бизнес, като понякога тези познанства прерастват в предложения за практика и стаж.

<br></br><br></br>Всяка година Hack TUES се организира от координационен екип доброволци от 11-ти клас, който се грижи за цялостната организация на събитието под менторството на АЗТУЕС и ръководството на ТУЕС.
&nbsp;<br></br><br></br><b>Поради</b>&nbsp;наложеното извънредно положение в страната заради COVID-19 пандемията, тазгодишното издание на Hack TUES 6, първоначално планирано за 12-15 март, се отлага за 1-11 октомври.
            </Text>
        </Flex>
    );
}

export default Panel;