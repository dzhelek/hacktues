import React from 'react'
import GetPanelData from '../../components/regulation/panel'


const panels = [
    { title: "Hello", description: "Kill me",},
    { title: "Hello2", description: "Kill me2",},];


export default function Regulation() {
    return (
        <div>
            <GetPanelData lenght={panels.length} panels={panels}/>
        </div>
    )
}
