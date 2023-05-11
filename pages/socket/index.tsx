import { useCallback, useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

const Home = () => {
  const [input, setInput] = useState('')
  const [socket, setSocket] = useState(undefined)

  const socketInit = useCallback(async () => {
    await fetch('/api/socket')
    const socket = io()
    setSocket(socket)

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('status', msg => {
      setInput(msg);
    })

    socket.on('update-input', msg => {
      console.log('update-input', msg)
      setInput(msg)
    })
  }, [])

  useEffect(() => {
    socketInit();
  }, [])

  const onChangeHandler = (e) => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  return (
    <input
      placeholder="Type something"
      value={input}
      onChange={onChangeHandler}
    />
  )
}

export default Home;