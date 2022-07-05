import styled from 'styled-components'

export const Container = styled.div`
    padding: 80px 60px;
    background-color: #2A4858;
    width: 100%;
    font-family: 'Nunito Sans', sans-serif;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 60px;
`

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 20px;

    @media (max-width: 1000px){
        grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    }
`

export const Link = styled.div`
    color: #fff;
    margin-bottom: 20px;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        color: #ff9c00;
        transition: 150ms ease-in;
        cursor: pointer;
    }
`

export const Title = styled.div`
    font-size: 24px;
    color: #fff;
    margin-bottom: 40px;
    font-weight: bold;
`










// .footer{
   
//     position: fixed;
//     margin-top: auto;
//     left: 0;
//     bottom: 0;
//     width: 100%;
//     background-color: red;
//     color: white;
//     text-align: center;
    
// }