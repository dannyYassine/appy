
import React from 'react'
import { render } from 'react-dom'
import { RouterRoot } from './web/routes/RootRoute'

render(
    <div>
        {RouterRoot()}
    </div>,
    document.getElementById('root')
)


