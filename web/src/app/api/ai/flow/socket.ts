import type { NextApiRequest } from 'next'
import { Server as IOServer } from 'socket.io'
import NextApiResponseWithSocket from '@/types/socket'

const SocketHandler = (_: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing...')

    const io = new IOServer(res.socket.server.io, {
      path: '/api/ai/flow/socket',
      addTrailingSlash: false,
    })

    res.socket.server.io = io

    io.on('connection', (socket) => {
      socket.broadcast.emit('chat', 'Hello from Socket.io')

      socket.on('message', (msg) => {
        socket.broadcast.emit('chat', msg)
      })
    })
  }

  res.end()
}

export default SocketHandler

/*
async function query(data) {
  const response = await fetch('http://flow.discontinuity.ai/api/v1/prediction/<chatflow-id>', {
    method: 'POST',
    body: data,
  })
  const result = await response.json()
  return result
}*/
