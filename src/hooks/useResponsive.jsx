import { useEffect, useState } from 'react'

const subscribers = new Set()

let responsiveConfig = {
    'xs': 0,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1800,
}

export function configResponsive(config) {
    responsiveConfig = config
    calculate()
}

let info = {
    innerWidth: undefined,
}

function calculate() {
    if (typeof window == 'undefined') {
        return;
    }
    const innerWidth = window.innerWidth;
    const newInfo = {};
    for (const key of Object.keys(responsiveConfig)) {
        newInfo[key] = innerWidth >= responsiveConfig[key]
    }
    info = {
        ...newInfo,
        innerWidth,
    }
}
typeof window !== 'undefined' && window.addEventListener('resize', () => {
    const oldInfo = info
    calculate()
    if (oldInfo === info) return
    for (const subscriber of subscribers) {
        subscriber()
    }
})

export function useResponsive() {
    const [state, setState] = useState(info)

    useEffect(() => {
        const subscriber = () => {
            setState(info)
        }
        subscribers.add(subscriber);
        calculate();
        subscriber();
        return () => {
            subscribers.delete(subscriber)
        }
    }, [])

    return state;
}