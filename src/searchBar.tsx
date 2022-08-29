import React, { ChangeEvent } from 'react';

function customInputText ({onInputUpdate}:{
    onInputUpdate:(text:string) =>void
}) {

    const [searchValue, setSearchValue] = React.useState<string>("");
    // const [buttonDisabled, setButtonDisabled]= React.useState<boolean>(true);
    React.useEffect(() =>{
      // if(searchValue===""&&!buttonDisabled){
      //   setButtonDisabled(true);
      // }else if (searchValue!=="" && buttonDisabled){
      //   setButtonDisabled(false);
      // }
      // const delayDebounceFn=setTimeout(()=>{
        onInputUpdate(searchValue);
        // },3000)
        // return()=>clearTimeout(delayDebounceFn)
      },[searchValue])

    return(
    <div>
      <input onChange={e=> setSearchValue(e.target.value)}  type="text" placeholder="Code" className="text"/>

      <button className="button">Search</button>
    </div>
    );
}
export default customInputText;