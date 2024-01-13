import { createContext, useState } from 'react'

export const ChatContext = createContext();


const ChatProvider = ({children})=>{
    const {user, setUser} = useState();
        return (
        <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
        );
}

export default ChatProvider;