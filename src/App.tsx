import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from './actions';
import SearchBar from './searchBar';

function App() {
  const dispatch=useDispatch();
  
  const onSearchTextUpdate =(text:string)=>{
    dispatch(updateFilters('searchText',text))
  }
  return (
    <>
    <SearchBar
    onInputUpdate={onSearchTextUpdate}
    />
    </>
  );
}

export default App;
