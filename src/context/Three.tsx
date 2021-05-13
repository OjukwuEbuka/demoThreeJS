import React, {createContext, useState} from 'react';

const contextObj: {
    threeObjects: any[],
    setThreeObjects: Function
} = { threeObjects: [], setThreeObjects: () => {} };

const ThreeContext = createContext(contextObj);

function ThreeProvider (props: any) {
    const [threeObjects, setThreeObjects] = useState([])

    return (
        <ThreeContext.Provider value={{threeObjects, setThreeObjects}}
            {...props}
        />
    )
}

export {ThreeProvider, ThreeContext}