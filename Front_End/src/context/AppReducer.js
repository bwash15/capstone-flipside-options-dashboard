// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
      case 'REMOVE_TILE':
        return {
          ...state,
          tiles: state.tiles.filter(tile => {
            return tile.id !== action.payload;
          })
        }
      case 'ADD_TILE':
        return {
          ...state,
          tiles: [action.payload, ...state.tiles]
        }
      case 'EDIT_TILE':
        const updateTile = action.payload;
  
        const updateTiles = state.tiles.map(tile => {
          if (tile.id === updateTile.id) {
            return updateTile;
          }
          return tile;
        })
        return {
          ...state,
          tiles: updateTiles
        }
  
      default:
        return state;
    }
  }