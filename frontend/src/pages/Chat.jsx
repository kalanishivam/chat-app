import React, { useContext } from 'react'
import {Box} from '@mui/material'
import { ChatContext } from '../Context/ChatProvider.js'

const Chat = () => {
  const { user, setUser } = useContext(ChatContext);
  
  return (
    <div>
        <Box>
            hello from meterail u
        </Box>

    </div>
  )
}

export default Chat