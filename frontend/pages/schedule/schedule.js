import React from 'react'
import { Box } from "@chakra-ui/core";
import Entry from "../../components/schedule/entry"
import { IoIosLaptop, IoMdPin } from "react-icons/io";

var emojiLaptop = <IoIosLaptop/>;
var emojiPin = <IoMdPin/>;
const Schedule = props => (
    <Box p="5%">
        <Entry place="https://goo.gl/maps/dqveFsehYJWcV1sh6" link="https://goo.gl/maps/dqveFsehYJWcV1sh6" emoji={emojiPin} title="Откриване на събитието" time="19:00-20:00" place="Sofia Tech Park"/>
        <Entry place="https://goo.gl/maps/dqveFsehYJWcV1sh6" emoji={emojiPin} title="Откриване на събитието" time="19:00-20:00" place="Sofia Tech Park"/>
        <Entry place="https://goo.gl/maps/dqveFsehYJWcV1sh6" emoji={emojiPin} title="Откриване на събитието" time="19:00-20:00" place="Sofia Tech Park"/>
        <Entry place="https://goo.gl/maps/dqveFsehYJWcV1sh6" emoji={emojiPin} title="Откриване на събитието" time="19:00-20:00" place="Sofia Tech Park"/>

        <Entry place="https://goo.gl/maps/dqveFsehYJWcV1sh6" emoji={emojiPin} title="Откриване на събитието" time="19:00-20:00" place="Sofia Tech Park"/>
    </Box>
    
);

export default Schedule;