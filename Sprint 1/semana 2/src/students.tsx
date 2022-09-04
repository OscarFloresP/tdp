import * as React from 'react';
// import { RootStateOrAny } from 'react';
import { useSelector } from 'react-redux';


interface studentsProps{
    columns: Array<string>,
    data:Array<student>
}

export const DataTable: React.FC<studentsProps>=({columns,data})=>{
    // const filters = useSelector((state:RootStateOrAny)=>state.FilterReducer)
    // const shouldDisplay=(user:student)=>{
    //     let matchFirstNametext=filters.search===''?true:user.first_name.toLowerCase().includes(filters.search);
    //     let matchLastNametext=filters.search===''?true:user.last_name.toLowerCase().includes(filters.search);
    //     return matchFirstNametext && matchLastNametext;

    // const filterData=data.filter((user:student)=> shouldDisplay(user));
    return (
    <div className="container">
        <div className="row">
        {
            columns.map((column:string)=>{
                return(
                    <div key={column}>{column}</div>
                )
            })
        }   
        </div>
        <div>
            {data.map((row:student)=>{
                return(
                <ul key={row.first_name}>
                    <img src={row.avatar} alt="Avatar"/>
                    <li>
                       {`Nombre: ${row.first_name} ${row.last_name}
                        Correo: ${row.email}`}
                    </li>                  
                </ul>
                )
                    
            })}
        </div>
    </div>
    )
}