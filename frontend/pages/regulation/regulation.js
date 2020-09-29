import React from 'react'
import GetPanelData from '../../components/regulation/panel'

var React = require('react');
var Markdown = require('react-markdown');
s

const panels = [
    {
        title: "# HACK TUES и COVID-19", 
        description: <Markdown source={} />,},
    { title: "Hello2", description: "Kill me2",},];


export default function Regulation() {
    return (
        <div>
            <GetPanelData lenght={panels.length} panels={panels}/>
        </div>
    )
}
