import * as React from 'react';
import {OptionHeading} from './optionHeading';
import {InnerTileList} from './innerTilesList'
import 'bootstrap/dist/css/bootstrap.min.css'

export function BasicOptionCard() {
  return (
    <div style = {{maxWidth:"30rem", margin: "4rem auto"}}>
      <OptionHeading />
      <InnerTileList/>
    </div>
  );
  }
