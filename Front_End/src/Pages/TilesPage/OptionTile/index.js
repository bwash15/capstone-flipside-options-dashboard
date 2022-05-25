import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import "@material/list/dist/mdc.list.min.css"
import "@material/card/dist/mdc.card.min.css"
import { AddOption } from './AddOption';
export default function OptionTile() {



  return (
    <AddOption/>
  );
}


{/* <div>
  <ul className="mdc-list mdc-list--two-line">
    <li className="mdc-list-item" tabindex="0">
      <span className="mdc-list-item__ripple"></span>
      <span className="mdc-list-item__text">
        <span className="mdc-list-item__primary-text">Two-line item</span>
        <span className="mdc-list-item__secondary-text">Secondary text</span>
      </span>
    </li>
    <li className="mdc-list-item">
      <span className="mdc-list-item__ripple"></span>
      <span className="mdc-list-item__text">
        <span className="mdc-list-item__primary-text">Two-line item</span>
        <span className="mdc-list-item__secondary-text">Secondary text</span>
      </span>
    </li>
    <li className="mdc-list-item">
      <span className="mdc-list-item__ripple"></span>
      <span className="mdc-list-item__text">
        <span className="mdc-list-item__primary-text">Two-line item</span>
        <span className="mdc-list-item__secondary-text">Secondary text</span>
      </span>
    </li>
  </ul>
</div> */}