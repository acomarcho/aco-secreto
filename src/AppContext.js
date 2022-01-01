import {createContext, useState} from 'react'

const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState({});
  const [refresh, setRefresh] = useState(1);

  const context = {
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    messages: messages,
    setMessages: setMessages,
    comments: comments,
    setComments: setComments,
    refresh: refresh,
    setRefresh: setRefresh
  }
  return (
    <AppContext.Provider value={context}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
