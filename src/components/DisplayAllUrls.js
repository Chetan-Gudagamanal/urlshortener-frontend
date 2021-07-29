
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container } from '@material-ui/core';

export default function DisplayAllUrls({inputData}) {
  let rows=[]
  for(let ele of inputData){
    const obj={...ele,id:ele._id}
    rows.push(obj)
  }
  return (
    <Container>
      <br/>
      <div style={{ height: 400, width: '100%' ,background:"#918d89", color:"#575149"}}>
       <DataGrid
        columns={[
          {
            field: 'shortUrl',
            flex: 0.2,
            cellClassName: 'super-app-theme--cell'
          },
          {
            field: 'longUrl',
            flex: 0.3,
          },
          {
            field: 'urlHitCount',
            flex: 0.2,
          }
        ]}
        rows={rows}
      />
      </div>
    </Container>
  );
}