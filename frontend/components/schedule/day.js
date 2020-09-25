import React from 'react'
import Entry from "../../components/schedule/entry"

export default function Day(props){
    let content = [];
    for (let x = 0; x < props.lenght; x++) {
            //console.log(props.schedule[x].title);
            content.push(<Entry className={"keen-slider__slide number-slide"+ x} key={x} title={props.schedule[x].title} time1={props.schedule[x].time1} time2={props.schedule[x].time2} link={props.schedule[x].link} emoji={props.schedule[x].emoji} place={props.schedule[x].place}/>);
        }
    //console.log(props);
    return content;
}
