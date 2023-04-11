import React from 'react'
import { Routes, Route } from 'react-router-dom'

import routes from '../../routes'


const Content = () => {
    return (
        <>
            <Routes>
                {routes.map((route, index)=> {
                    return (
                        route.element && (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                element={<route.element />}
                            />
                        )
                    )
                })}
            </Routes>
        </>
    )
}

export default Content