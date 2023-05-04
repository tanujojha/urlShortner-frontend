import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/context';
import "./tableData.css";
import { clientURL } from '../general';

function TableData() {

  const context = useContext(AppContext)
  const {allUrls, getAllUrls, urlData} = context;

  useEffect(()=>{
    getAllUrls()
  }, [urlData])

  return (
    <div className='tabledata'>
        <table>
          <thead>
            <tr>
              <th className='lurlhead'>Long URL</th>
              <th className='surlhead'>Short URL</th>
              <th className='tchead'>Time's Clicked</th>          
            </tr>
          </thead>
          <tbody>
            
            {
              allUrls.map((url, index)=>{
                return (
                  <tr>
                    <td>{url.longurl}</td>
                    <td>{clientURL}/urlshortner/{url.shorturl}</td>
                    <td>{url.count}</td>
                  </tr>
                )
              })
            }
            
          </tbody>
        </table>
    </div>
  )
}

export default TableData