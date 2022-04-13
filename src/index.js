import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Calendar } from '@nivo/calendar';
import { parseEtherscanData } from './data.js';


//const calendarLightTheme = {}; //for later
const calendarDarkTheme = {
    "background": "#22272e",
    "textColor": "#adbac7",
    "tooltip": {
        "container": {
            "background": "#40464f",
            "color": "#adbac7",
            "fontSize": 12
        },
    }
};

var transactionData = []


const testData =  [
{
    day: "2020-11-22",
    value: 1
},
{
    day: "2020-12-09",
    value: 1
},
{
    day: "2020-12-24",
    value: 2
},
{
    day: "2021-02-09",
    value: 1
},
{
    day: "2021-05-01",
    value: 10
},
{
    day: "2021-05-02",
    value: 1
},
{
    day: "2022-02-05",
    value: 4
},
{
    day: "2022-03-06",
    value: 1
}
];



const margin = {
top: 40,
right: 10,
bottom: 10,
left: 60
};

const TopBar = ({updateData}) => {

    console.log("Top Bar Initialized")

    const inputRef = React.useRef();



    const handleKeyDown = async (event) => {

        // check if keypress was Enter + check for a valid address (add checksummed version later?)
        if (event.code === "Enter" && (/^(0x)?[0-9a-f]{40}$/i.test(inputRef.current.value))) {
            console.log(inputRef.current.value);
            transactionData = await parseEtherscanData(inputRef.current.value);
            console.log(transactionData);
            
            updateData(transactionData);

        }
    }

    React.useEffect(() => {
        const inputRefCurrent = inputRef.current;
        inputRefCurrent.addEventListener('keydown', handleKeyDown);
    
        // cleanup this component
        return () => {
            inputRefCurrent.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
        <div className="topBarContainer">
            <a href = "/" className="mainLogoContainer">
                <img alt="" className="icon" src="/icons/calendarGreen.svg"></img>
                <div className="logoText">txnCalendar</div>
            </a>
            <div className="inputContainer">
                <img alt="" className="searchIcon" src="/icons/search.svg"></img>
                <input ref = {inputRef} className="addressInput" placeholder="Search by address"></input>
            </div>
        </div>

        <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Exo:wght@286&display=swap');

            .topBarContainer {
            /*background-color: #4c5057;*/
            width: 100%;
            height: 80px;
            border-style: none none solid none;
            border-color: #00ffcc;
            border-width: 1px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            
            }
            
            .mainLogoContainer {
            
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            padding: 0 max(calc(50vw - 500px), 20px);
            color: inherit;
            text-decoration: none;
            
            }
            .logoText {
            font-family: 'Exo';
            font-weight: bold;
            font-size: 20px;
            
            }
            .icon {
            height: 25px;
            }
            
            .inputContainer {
            /*position*/
            margin-right: max(calc(47vw - 500px), 20px) ;
            margin-left: auto;
            width: max(20%, 200px);
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            
            /*style*/
            background: #2d333b;
            border-width: 1px;
            border-style: solid;
            border-color: #2d333b;
            outline: none;
            border-radius: 20px;
            padding: 9px 15px;
            color: #adbac7;
            
            transition-duration: 0.5s;
            
            
            }
            
            .inputContainer:focus-within {
            border-color: #00ffcc;
            color: #00ffcc;
            }
            .searchIcon{
            height: 100%;
            }
            .searchIcon:focus + .addressInput {
            color: #00ffcc;
            }
            
            .addressInput {
            background: none;
            outline: none;
            border:none;
            color: #adbac7;
            width: 92%;
            font-family: 'Exo';
            }
            .addressInput::placeholder {
            font-weight: bold;
            color: #81858a;
            }        
        `}</style>
        </>
    )
}

const CalendarBox = ({transactionData}) => {
    //console.log("Calendar Initialized")

    const [stateWidth, updateWidth] = React.useState(window.innerWidth/1.5);

    // calculating height based on amount of years in calendar (because the nivo calendar is dumber than kreepa)
    const [stateHeight, updateHeight] = React.useState(400 * (transactionData[transactionData.length - 1].day.slice(0,4) - transactionData[0].day.slice(0,4)));
    
    console.log(200 * (transactionData[transactionData.length - 1].day.slice(0,4) - transactionData[0].day.slice(0,4)))

    const resizeHandler = () => {
        updateWidth(window.innerWidth/1.5)
        updateHeight(400 * (transactionData[transactionData.length - 1].day.slice(0,4) - transactionData[0].day.slice(0,4)))
    }

    React.useEffect(() => {
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        }
    })

    return ( 
        <>

            <Calendar id="CalendarComponent"
            margin={margin}
            width={stateWidth}
            height={1000}
            from={transactionData[0].day}
            to={transactionData[transactionData.length - 1].day}
            data={transactionData}
            emptyColor="#2d333b"
            colors={[ '#D5FFF2', '#9effe8', '#71ffe0', '#35ffd5', '#00FFCC' ]}
            yearSpacing={40}
            monthBorderWidth={0}
            monthBorderColor="#22272e"
            monthLegendOffset={10}
            dayBorderWidth={5}
            dayBorderColor="#22272e"
            dayRadius={20}
            theme={calendarDarkTheme}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'top-to-bottom'
                }
            ]}
            />


        <style jsx>{`
          .CalendarContainer {
            textAlign: "center" !important;
            vertical-align: top !important;
          }
          .CalendarComponent {
              vertical-align: top;
          }
        `}</style>
        </>
    );
}


const AppContainer = () => {

    console.log("App initialized")

    const [transactionData, updateData] = React.useState(testData);


    /*
    const onSubmitData = (dataParam) => {
        updateData(dataParam);
        console.log('bruhgma')
    }
    */

    return (
        <>
            <TopBar updateData={updateData} />
            <CalendarBox transactionData={transactionData} />
            <style jsx>{`
                body {
                    background-color: #22272e;
                    color: #adbac7;
                    font-family: Arial;
                    text-align: center;
                    margin: 0;
                }
            `}</style>
        </>
    )
}

class App extends React.Component {


    render () {
        return (
            <AppContainer/>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));