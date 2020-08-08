import React from 'react'
import path from 'path'
import fs from 'fs'
import express from 'express'
import ReactDOMServer from 'react-dom/server'
import App from '../src/App'

const PORT = process.env.PORT || 8000
const server = express()
const templatePath = path.resolve(`./build/index.html`)

function asyncTryCatch(promise) {
  return promise
    .then((answer) => [answer, null])
    .catch((reason) => [null, reason])
}

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, `utf8`, (error, raw) => {
      if (error) {
        return reject(error)
      }
      resolve(raw)
    })
  })
}

server
  .get(`/`, async (req, res) => {
    const app = ReactDOMServer.renderToString(<App />)

    const [html, error] = await asyncTryCatch(readFile(templatePath))
    if (error) {
      console.error(error)
      return res.status(500).end(`Internal Server Error`)
    }
    if (!html) {
      return res.status(404).end(`Page Not Found`)
    }
    return res.send(
      html.replace(`<div id="root"></div>`, `<div id="root">${app}</div>`)
    )
  })
  .use(express.static(`./build`))
  .listen(PORT, () =>
    console.log(`Server is listening on port http://localhosts:${PORT}`)
  )
