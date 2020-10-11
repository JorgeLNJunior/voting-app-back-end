const app = require('./app')
const knex = require('./database/index')

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received')
  server.close(async () => {
    console.log('HTTP server closed')
    knex.destroy(() => {
      console.log('database disconected')
      process.exit(0)
    })
  })
})
