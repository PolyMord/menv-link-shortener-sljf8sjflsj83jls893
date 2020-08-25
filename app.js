const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 3000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}...`)
    )
  } catch (e) {
    console.log('Server error')
    process.exit(1)
  }
}

app.get('/', async (req, res) => {
  res.send('Hi')
})

start()
