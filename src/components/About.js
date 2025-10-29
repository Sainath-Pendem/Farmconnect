import farm from './farm.jpg'
import './About.css';
import Features from './Features';

export default function About() {
    return(
        <>
        <div className="about  d-flex justify-content-center" >
            <div className='text mx-3' style={{color:"$green-500"}}>
                <h2 className='highlight-title '><b>FarmConnect-Experience The Future</b></h2>
                <p>Agriculture remains the backbone of many economies, yet farmers often struggle to earn fair profits for their produce. One of the major challenges they face is the presence of multiple intermediaries—traders, agents, and wholesalers—who reduce the farmer’s share in the final selling price. As a result, despite working hard, many farmers receive minimal income, while buyers end up paying inflated prices.</p>
            </div>
            <div className="pic">
                <img src={farm}  alt=""/>
            </div>
        </div>
        <Features/>
        </>
    )
}