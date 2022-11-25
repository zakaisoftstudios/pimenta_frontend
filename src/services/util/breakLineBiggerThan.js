import React from 'react'

export const breakLineBiggerThan = (text, max, breakHere) => {
    if (text.length > max && window.innerWidth < 500) {
        return(
            <>
                <div>{text.substring(0, breakHere)}</div>
                <div>{text.substring(breakHere, text.length)}</div>
            </>
        )
    }
    return text;
}