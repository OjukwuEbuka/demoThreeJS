import React, {createContext, useState} from 'react';

let contextObj: {
    leftDrawerOpen: boolean, 
    setLeftDrawerOpen: Function
    modalOpen: boolean, 
    setModalOpen: Function
    editModalOpen: boolean, 
    setEditModalOpen: Function
} = {
    leftDrawerOpen: false, 
    setLeftDrawerOpen: () =>{},
    modalOpen: false, 
    setModalOpen: () =>{},
    editModalOpen: false, 
    setEditModalOpen: () =>{},
}

const LayoutContext = createContext(contextObj);

function LayoutProvider(props: any){
    const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    return (
        <LayoutContext.Provider
            value={{leftDrawerOpen, setLeftDrawerOpen, modalOpen, setModalOpen, editModalOpen, setEditModalOpen}}
            {...props}
        />
    )
}

export { LayoutContext, LayoutProvider };