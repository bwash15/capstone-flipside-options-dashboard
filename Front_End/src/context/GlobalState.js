import React, {createContext, useReducer} from 'react'
import AppReducer from './AppReducer';

//Initial state
const initialState = {
    tiles: []
}

//Create context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    
    //Actions
    const removeTile = (id) => {
        dispatch({
            type: 'REMOVE_TILE',
            payload: id
        })
    }
    const addTile = (tile) => {
        dispatch({
            type: 'ADD_TILE',
            payload: tile
        })
    }
    const editTile = (tile) => {
        dispatch({
            type: 'EDIT_TILE',
            payload: tile
        })
    }

    return(
        <GlobalContext.Provider value={{
            tiles: state.tiles,
            removeTile,
            addTile,
            editTile
        }}>
            {children}
        </GlobalContext.Provider>
    )
}