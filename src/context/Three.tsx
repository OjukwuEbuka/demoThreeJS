import React, {createContext, useState} from 'react';

const contextObj: {
    threeObjects: any[],
    setThreeObjects: Function,
    editObject: any,
    setEditObject: Function,
} = { 
    threeObjects: [], 
    setThreeObjects: () => {} ,
    editObject: null,
    setEditObject: () => {},
};

const ThreeContext = createContext(contextObj);

function ThreeProvider (props: any) {
    const [threeObjects, setThreeObjects] = useState([])
    const [editObject, setEditObject] = useState(null)

    return (
        <ThreeContext.Provider value={{threeObjects, setThreeObjects, editObject, setEditObject}}
            {...props}
        />
    )
}

export {ThreeProvider, ThreeContext}