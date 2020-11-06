import React from 'react'
import Entry from "../../components/schedule/entry"

export default function Day(props){
    let content = [];
    for (let x = 0; x < props.lenght; x++) {
        content.push(<div>1</div>)    
        // content.push(<Entry className={"keen-slider__slide number-slide" + x} marginTop="25px" notime={props.schedule[x].notime} title={props.schedule[x].title} time1={props.schedule[x].time1} time2={props.schedule[x].time2} link={props.schedule[x].link} emoji={props.schedule[x].emoji} place={props.schedule[x].place}/>);
        }
    return content;
}