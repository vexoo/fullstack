const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require("../utils/middleware")

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    //const { title, url } = request.body
    const body = request.body
    /*if (!title || !url) {
        return response.status(400).json({ error: 'title or url missing' })
    }*/
    //const blog = new Blog(request.body)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const result = await blog.save()
    response.status(201).json(result.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        body,
        { new: true }
    )

    if (updatedBlog) {
        response.status(200).json(updatedBlog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogsRouter