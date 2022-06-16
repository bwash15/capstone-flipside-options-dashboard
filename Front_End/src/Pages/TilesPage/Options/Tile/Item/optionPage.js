import * as React from 'react';
import {OptionsListHeading} from './optionsListHeading';
import {InnerTileList} from './innerTilesList'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function BasicOptionCard() {
  return (
    <div style = {{maxWidth:"30rem", margin: "4rem auto"}}>
      <OptionsListHeading />
      <InnerTileList/>
    </div>
  );
  }
