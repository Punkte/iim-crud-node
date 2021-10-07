import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import express from 'express'
import { connectDb } from './helpers/connection.js'
import verify from './middlewares/verify.js'

import IndexRoutes from './routes/index.js' 
import UserRoutes from './routes/user.js' 
import AuthRoutes from './routes/auth.js' 
import ArticleRoutes from './routes/article.js'

const app = express()
const port = process.env.API_PORT || 4000

connectDb()

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());
app.use('/api', IndexRoutes)
app.use('/api/user', verify, UserRoutes)
app.use('/api/article', ArticleRoutes)
app.use('/api/auth', AuthRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const httpServer = http.createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  }
});

io.on('connection', socket => {
  socket.on('join', function(token) {
    console.log(token)
    io.emit('messages', JSON.stringify(socket.rooms));
  });
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})