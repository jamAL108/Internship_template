import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const timeline:React.FC<any> = (props) => {
    const { item } = props;
    return (
        <VerticalTimelineElement
            className="vertical-timeline-element--work timeline-view-element !rounded-[20px]"
            contentStyle={{ background: '#fdfdfd', color: '#000' ,  }}
            contentArrowStyle={{ borderRight: '0px solid white' }}
            date={item.hearingDate.length===0 ? 'Not listed' : item.hearingDate}
        >
            <h3 className="vertical-timeline-element-title">{item.purpose}</h3>
        </VerticalTimelineElement>
    )
}

export default timeline