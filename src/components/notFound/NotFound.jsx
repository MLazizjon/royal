import React from 'react'
import { NoteFoundContainer } from './NotFound.styles'
import { Title } from '../../style/StyleComponent'

const NotFound = () => {
  return (

    <NoteFoundContainer>
    <div className='max-width'>
     <Title>
        404
     </Title>
    </div>
    </NoteFoundContainer>
  )
}

export default NotFound
