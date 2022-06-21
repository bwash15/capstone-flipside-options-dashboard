import * as React from 'react';
import {OptionsHeading} from './Options/Tile/optionsHeading';
import { NewsHeading } from './News/Tile/newsHeading';
import { NewsTileList } from './News/Tile/Item/newsInnerTileList';
import {TileList} from './Options/Tile/TileList'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BasicCard() {
  return (
    <div>
      <div style = {{maxWidth:"30rem", margin: "4rem auto"}}>
        <OptionsHeading />
        <TileList/>
      </div>
      <div style = {{maxWidth:"30rem", margin: "4rem auto"}}>
        <NewsHeading />
        <NewsTileList/>
      </div>
    </div>

  );
  }
