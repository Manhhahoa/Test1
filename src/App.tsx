import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Main from './drag/Main'
const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Main />
      </div>
    </DndProvider>

  )
}

export default App