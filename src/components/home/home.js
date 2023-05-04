import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/context';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function DayWiseChart({data}){
  
  return(
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

function MonthWiseChart({data}){
  
  return(
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="numberofdocuments" fill="#82ca9d"/>
      </BarChart>
    </ResponsiveContainer>
  )
}

function Home() {

  const context = useContext(AppContext);
  const {urlData, getUrlsCountByDate, urlsDataByDate, getUrlsCountByMonth, urlsDataByMonth} = context;

  useEffect(()=>{

    getUrlsCountByDate();
    getUrlsCountByMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlData])
  
   
  return (
    <div className='home'>
        <h1 className='mt-5 mb-5 p-3' style={{textAlign: "left"}}>Total Number of URLs Created Per Day</h1>
        <DayWiseChart data={urlsDataByDate}/>
        <h1 className='mt-5 mb-5 p-3' style={{textAlign: "left"}}>Total Number of URLs Created Per Month</h1>
        <MonthWiseChart data={urlsDataByMonth}/>
    </div>
  )
}

export default Home