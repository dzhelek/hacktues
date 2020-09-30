import React from 'react'
import GetPanelData from '../../components/regulation/panel'
const ReactMarkdown = require('react-markdown')
import Markdown from 'markdown-to-jsx';
import txt from 'raw-loader!./regulation.md';

var parts = txt.split(";;");

const panels = [
    { title: <Markdown>### HACK TUES и COVID-19</Markdown>, description: <Markdown>{parts[0]}</Markdown>},
    { title: <Markdown>### Отговорност</Markdown>, description: <Markdown>{parts[1]}</Markdown>},
    { title: <Markdown>### Регистрация</Markdown>, description: <Markdown>{parts[2]}</Markdown>},
    { title: <Markdown>### Проекти</Markdown>, description: <Markdown>{parts[3]}</Markdown>},
    { title: <Markdown>### Техника и технологии</Markdown>, description: <Markdown>{parts[4]}</Markdown>},
    { title: <Markdown>### Оценяване от менторите</Markdown>, description: <Markdown>{parts[5]}</Markdown>},
    { title: <Markdown>### Оценяване от участниците</Markdown>, description: <Markdown>{parts[6]}</Markdown>},
    { title: <Markdown>### Оценяване от журито</Markdown>, description: <Markdown>{parts[7]}</Markdown>},
    { title: <Markdown>### Провеждане на четвъртфинали, полуфинали и финали</Markdown>, description: <Markdown>{parts[8]}</Markdown>},
    { title: <Markdown>### Дисквалификация</Markdown>, description: <Markdown>{parts[9]}</Markdown>},
    { title: <Markdown>### Дисквалификация</Markdown>, description: <Markdown>{parts[10]}</Markdown>},
];

export default function Regulation() {
    return (
        <div>
            <GetPanelData lenght={panels.length} panels={panels}/>
        </div>
    )
}
