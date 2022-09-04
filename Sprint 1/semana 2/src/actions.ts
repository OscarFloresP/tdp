export type Action ={type: "SEARCH",payload:string}
export const addNote=(note:string):Action => ({
    type: "SEARCH",
    payload:note,
});
export const actionConsts = {
    clear: "clear",
    update: "update",
};
export const updateFilters =(category:any,filters:any)=>{
    return{
        type:actionConsts.update,
        payload:{[category]:filters}
    }
}