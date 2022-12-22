import React,{ useState, useEffect} from "react";
import './Dashboard.css'
import profilePicture from '../../assets/man.png'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MainCard from "../Card/MainCard";
import {Link} from "react-router-dom"
import axios from 'axios'

// const [chartData, setChartData] = useState([{
//     labels: ['Run', 'Bicycle', 'Swim', 'Walk', 'Hike'],
//     datasets: [
//       {
//         data: [12, 19, 3, 5, 2],
//         label: 'Hour of activity',
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
          
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
          
//         ],
//         borderWidth: 1,
//       },
//     ], 
// }])



// export 


const Dashboard = () => {

    const user = localStorage.user
    const [chartData, setChartData] = useState([])
    console.log(chartData)

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = { 
        labels: chartData.map(item => item._id),
        
        datasets: [
          { 
            
            data: chartData.map(item => item.totalscore),
            label: 'Activity Total',
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              
            ],
            borderWidth: 1,
          },
        ],
      };
    
    // const [chartData, setChartData] = useState([{
    //     labels: chartData.map(item => item.activityName),
    //     datasets: [
    //       {
    //         data: chartData.map(item => item.count),
    //         label: 'Hour of activity',
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
              
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
              
    //         ],
    //         borderWidth: 1,
    //       },
    //     ], 
    // }])

    

    const [card,setCard] =useState([]);
    
    const [activityData,setActivityData] =useState([
        {_id:'1',Type:'Total activity',amount:'98'},
        {_id:'2',Type:'Completed',amount:'21'},
        {_id:'3',Type:'Inprogress',amount:'74'},
        {_id:'4',Type:'Incomplete',amount:'9'},
    ]);

    // 0=Pending,1 =  Completed , 9 = Incomplete
    const [totalStatus,setTotalStatus] = useState([
        { _id: 9, totalscore: 0 },
        { _id: 0, totalscore: 0 },
        { _id: 1, totalscore: 0 }
      ])

    let total = 0;
    let inProgress = 0;
    let complete = 0;
    let incomplete = 0;
    for ( let i in totalStatus) {
        total += totalStatus[i].totalscore
        if(totalStatus[i]._id==9){
            incomplete = totalStatus[i].totalscore
        }else if(totalStatus[i]._id==1){
            complete = totalStatus[i].totalscore
        }else{
            inProgress = totalStatus[i].totalscore
        }
    }
    

    
    
    // /chart-activity, /card-activity /total-status/

    // const {_id,activity,decripttion,endDate,startDate} = card;
    const fetchData = (path) => {
        axios.get(`${import.meta.env.VITE_APP_API}/${path}`,{ params: { user } })
        .then(response => {
            console.log(response.data)
            if(path == "card-activity") {
                setCard(response.data)
            } else if(path == "chart-activity") {
                    setChartData(response.data)
                    console.log(`i'm chart`,response.data)
            }
            else if(path == "total-status") {
                    setTotalStatus(response.data)
                    console.log(`i'm total`,response.data)
                }
            console.log(card)
        }).catch(err => console.log(err))
    }

    // async function fetchData2 (path) {
    //     try {
    //         const response = await axios.get(`${import.meta.env.VITE_APP_API}/${path}`,{ params: { user } })
    //         (path == "/card-activity") ? setCard(response) :console.log(response);
                
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(()=>{
        fetchData("card-activity")
        fetchData("chart-activity")
        fetchData("total-status")
        
    },[])




    
    
    return(
        
        


    <div className="container">
            
            <div className="left">

                <div className='left-top'>
                     <a href="/addactivity"><button type="button" className="addActivity">Add Activity</button></a>
                   
                </div>

                <div className='left-bottom'>
                    <div className='left-bottom-background'>
                        <div className="grid-container">
                            <Grid container 
                            direction="row"
                            justifyContent="center" 
                            alignItems="center"
                             spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                            
                            { card.length >0 && card.map((carditem,index) => 
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <MainCard key={carditem._id} card={carditem}/>
                                </Grid>
                            )}
                            
                            {/* {Array.from(Array(6)).map((_, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <SwimCard props={card} />
                                </Grid>
                            ))} */}

                            </Grid>
                        </div>

                    </div>                  
                    
                    
                    
                </div>

            </div>
            <div className="right">
                
                    <div className="display-card">
                        <span>Hello, </span>
                        <h2>{localStorage.displayName}</h2>
                        <Link to="/profile" className="picture-link">
                            <img src={localStorage.images} alt="profile-picture" className="profile-picture" />
                        </Link>
        
                        <div className="graph">
                            <Doughnut data={data} />
                        </div>

                        <div className="activity-container">
                            <div className="activity">
                                <p>Total activity:</p>
                                <span className="gray">|</span>
                                <span>{total}</span>
                            </div>
                            <div className="activity">
                                <p>Completed:</p>
                                <span className="green">|</span>
                                <span>{complete}</span>
                            </div>
                        </div>

                        <div className="activity-container">
                            <div className="activity">
                                <p>In progress:</p>
                                <span className="yellow">|</span>
                                <span>{inProgress}</span>
                            </div>
                            <div className="activity">
                                <p>Incomplete:</p>
                                <span className="red">|</span>
                                <span>{incomplete}</span>
                            </div>
                        </div>

                    </div>
                
            </div>
        
    </div>
    )
}
export default Dashboard