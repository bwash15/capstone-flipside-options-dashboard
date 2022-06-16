import * as React from 'react';
import { NewsListHeading } from './newsListHeading';
import { NewsInnerTileList } from './newsInnerTileList';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BasicNewsCard() {
  return (
    <div style = {{maxWidth:"30rem", margin: "4rem auto"}}>
      <NewsListHeading />
      <NewsInnerTileList/>
    </div>
  );
  }
