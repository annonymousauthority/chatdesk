const ChatWidgetContainer = ({ children }) => {
  return (
    <div className="pointer-events-auto fixed bottom-10 right-0 z-50 m-12 mt-0 max-h-[900px] max-w-[500px]">
      {children}
    </div>
  )
}

export default ChatWidgetContainer
