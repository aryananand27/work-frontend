import { createContext, useState } from "react";

export const CounterContext=createContext(null);

export const CounterProvider=(props)=>{
    let[count,setCount]=useState(0);
    let[subcount,setSubCount]=useState(0);
   
    return(
        <CounterContext.Provider value={{count,setCount,subcount,setSubCount}}>
            {props.children}
        </CounterContext.Provider>
    );
}