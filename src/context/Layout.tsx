import React, {createContext, useState} from 'react';

let contextObj: {
    leftDrawerOpen: boolean, 
    setLeftDrawerOpen: Function
    modalOpen: boolean, 
    setModalOpen: Function
} = {
    leftDrawerOpen: false, 
    setLeftDrawerOpen: () =>{},
    modalOpen: false, 
    setModalOpen: () =>{},
}

const LayoutContext = createContext(contextObj);

function LayoutProvider(props: any){
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <LayoutContext.Provider
            value={{leftDrawerOpen, setLeftDrawerOpen, modalOpen, setModalOpen}}
            {...props}
        />
    )
}

export { LayoutContext, LayoutProvider };