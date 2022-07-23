import React, { useState, createContext } from 'react';

export const IdContext = createContext()

export const IdProvider = (props) => {
    const [coinId, setCoinId] = useState('')
    return (
        <IdContext.Provider value={[coinId, setCoinId]}>
            {props.children}
        </IdContext.Provider>
    );
}