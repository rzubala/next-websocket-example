import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
let socket;

const Home = () => {
  const [input, setInput] = useState('')

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    socket = io()

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
  }

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