import express from 'express'
const router = express.Router()
router.get('/', async (req, res) => {
    const path = req.url
    console.log(`the query is ${path}`)
    return res.send(
        '<h1>hello world this is the task base route</h1>'
    )
})
router.post('/second', (req, res) => {
    const path = req.query
    console.log(path.name)
    return res.send(
        '<h1>hello world this is the task second route</h1>'
    )
})
export default router