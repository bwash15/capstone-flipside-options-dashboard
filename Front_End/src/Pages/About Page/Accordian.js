import React,{useState} from 'react'
import {Data} from './Data'
import styled from 'styled-components'
import {IconContext} from 'react-icons'
import {FiPlus, FiMinus} from 'react-icons/fi'

const AccordionSection = styled.div`
    align-items: center;
    justify-content: center;
    position: relative;
    height: 90vh;

`;
const Container = styled.div`
    box-shadow: 2px 10px 35px 1px rgba(153,153,153,0.3);
`;
const Wrap = styled.div`
    background: #272727;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-align: center;
    cursor: pointer;
    h1{
        padding: 2rem;
        font-size: 2rem;
    }
`;
const DropDown = styled.div`
    font-size: 2rem;
`;


export const Accordian = () => {
    const [clicked, setClicked] = useState(false)

    const toggle = index => {
        if(clicked === index){
            return setClicked(null)
        } else{
            setClicked(index)
        }
    }

  return (
    <IconContext.Provider value = {{color: '#00FFB9', size: '25px'}}>
        <AccordionSection>
            <Container>
                {Data.map((item, index) => {
                    return(
                        <>
                        <Wrap onClick = {() => toggle(index)} key= {index}>
                            <h1>{item.question}</h1>
                            <span>{clicked === index ? <FiMinus/> : <FiPlus/>}</span>
                        </Wrap>
                        {clicked === index ? (
                            <DropDown><p>{item.answer}</p></DropDown>
                        ) : null}
                        
                            
                        </>
                    )
                })}
            </Container>
        </AccordionSection>
    </IconContext.Provider>
  )
}
