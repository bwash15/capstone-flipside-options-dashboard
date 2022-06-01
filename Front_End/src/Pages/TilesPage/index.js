import * as React from 'react';
import {Heading} from './Heading';
import {TileList} from './TileList'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BasicCard() {
  return (
    <div style = {{maxWidth:"30rem", margin: "4rem auto"}}>
      <Heading />
      <TileList/>
    </div>
  );
  }
