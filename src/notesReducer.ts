export interface inputState{
    input:string[]
}
const initialState = {
    input: []
}
type Action={ type:"SEARCH", payload: string}
export const FilterReducer =(state:inputState=initialState, action:Action)=>{
    switch(action.type) {
        case "SEARCH":{
            return {... state, input:[...state.input,action.payload]}
        }
        default:
            return state
    }
}