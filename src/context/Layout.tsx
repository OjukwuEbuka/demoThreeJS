import React, {createContext, useState} from 'react';

let contextObj: {
    leftDrawerOpen: boolean, 
    setLeftDrawerOpen: Function
} = {leftDrawerOpen: false, setLeftDrawerOpen: () =>{}}

const LayoutContext = createContext(contextObj);

function LayoutProvider(props: any){
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);

    return (
        <LayoutContext.Provider
            value={{leftDrawerOpen, setLeftDrawerOpen}}
            {...props}
        />
    )
}

export { LayoutContext, LayoutProvider };