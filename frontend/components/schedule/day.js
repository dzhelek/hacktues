import React from 'react'
import Entry from "../../components/schedule/entry"

export default function Day(props){
    let content = [];
    for (let x = 0; x < props.lenght; x++) {
            content.push(<Entry marginTop="25px" className={"keen-slider__slide number-slide"+ x} key={x} notime={props.schedule[x].notime} title={props.schedule[x].title} time1={props.schedule[x].time1} time2={props.schedule[x].time2} link={props.schedule[x].link} emoji={props.schedule[x].emoji} place={props.schedule[x].place}/>);
        }
    return content;
}