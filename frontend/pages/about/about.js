import React from 'react'
import GetPanelData from '../../components/about/panel'
import txt from 'raw-loader!./about.md';

const panels = [
    {description: txt},
];

export default function Regulation() {
    return (
        <div>
            <GetPanelData lenght={panels.length} panels={panels}/>
        </div>
    )
}
