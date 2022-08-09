import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons'
import {faAngleRight} from '@fortawesome/free-solid-svg-icons'

import { NewsPopUp } from "../components/PopUp/newsPopUp"
import axios from "../api/axios"
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

export const NewsSlider = () => {
  const [newsTiles, setNewsTiles] = useState([]);
  const [buttonPopUp, setButtonPopup] = useState(false);
  const [newsObject, setNewsObject] = useState({});
  const {auth} = useAuth();
  const {user} = useUser();

  const getNewsTiles = () => {
    const url = '/userTiles/news/get';
    axios.post(url,JSON.stringify({
        "userID": user,
    }), 
        {
            headers: {Authorization :`Bearer ${auth.accessToken}`}
        })
        .then((response) => {
          setNewsTiles(response.data);
      })
  }

  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  }

  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  }
  const handlePopUp = () =>{
    setButtonPopup(!buttonPopUp);
  }
  

  useEffect(() => {
    getNewsTiles();
  }, []);

  return (
    <div >
        <NewsPopUp trigger={buttonPopUp} setTrigger = {setButtonPopup}>
          <h>{newsObject.stockName}</h>
          <br></br>
          <br></br>
          <br></br>
          <p>{newsObject.description}</p>
          <img src={newsObject.image_url} alt="URL"></img>
          <br />
          <br />
          <a href = {newsObject.news_link}>To Article</a>
        </NewsPopUp>

    {newsTiles.map((element, index) => (
        <div key={index}>
            <h2>{element.tileName}</h2>
            <div className='relative flex items-center'>
            <FontAwesomeIcon  size='2x' className='opacity-50 cursor-pointer hover:opacity-100' icon={faAngleLeft} onClick={slideLeft}/>
                <div id='slider' class='w-fit h-full overflow-scroll scroll whitespace-nowrap scroll-smooth  scrollbar-hide flex flex-row' >
                    {element.tiles.map((item) => (
                        <div>
                            <img onClick={() => {handlePopUp(); setNewsObject(item)}} className='h-[120px] w-[220px] inline-block p-1 cursor-pointer hover:scale-105 ease-in-out duration-300' src={item.image_url} alt={item.stockName}/>
                        </div>
                    ))}
                </div>
                <FontAwesomeIcon size='2x' className='opacity-50 cursor-pointer hover:opacity-100' icon={faAngleRight} onClick={slideRight}/>
            </div>
        </div>
    ))}
    </div>
  )
}
