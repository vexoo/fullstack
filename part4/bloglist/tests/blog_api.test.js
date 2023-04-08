const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")

const api = supertest(app)

const { listWithManyBlogs } = require('./blogList_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(listWithManyBlogs)
})

describe('when there is initially some blogs saved', () => {
    test('the blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('the id property of the blogs is named id instead of _id', async () => {
        const blogs = await api.get('/api/blogs')

        const idArray = blogs.body.map(blog => blog.id)

        for (const id of idArray) {
            expect(id).toBeDefined()
        }
    })
    test('deleting a blog works', async () => {

        const blogs = await api.get('/api/blogs')
        const blogToDelete = blogs.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAfter = await api.get('/api/blogs')
        const blogIds = blogsAfter.body.map(blog => blog.id)
        expect(blogIds).not.toContainEqual(blogToDelete.id)
    })

    test('updating data of a blog works', async () => {

        const blogs = await api.get('/api/blogs')
        const blogToUpdate = blogs.body[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: blogToUpdate.likes + 1 })
            .expect(200)

        const blogsAfter = await api.get('/api/blogs')
        const updatedBlog = blogsAfter.body[0]
        expect(updatedBlog.likes).toEqual(blogToUpdate.likes + 1)
    })
})




test('adding a blog works', async () => {
    const blogsBefore = await api.get('/api/blogs')

    const newBlog = {
        title: 'test blog',
        author: 'test author',
        url: "https://www.test.com",
        likes: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(blogsBefore.body.length + 1)
    expect(response.body.map(blog => blog.title)).toContainEqual('test blog')
})


describe('behavior when a blog property is missing is correct', () => {

    test('missing likes property defaults to 0', async () => {
        const newBlog = {
            title: 'test blog',
            author: 'test author',
            url: "https://www.test.com"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const response = await api.get('/api/blogs')
        const addedBlog = response.body.find(blog => blog.title === 'test blog')
        expect(addedBlog.likes).toBe(0)
    })

    test('missing title property results in status code 400 - Bad Request', async () => {
        const newBlog = {
            author: 'test author',
            url: 'https://www.test.com',
            likes: 0
        }
        const response = await api.post('/api/blogs').send(newBlog).expect(400)
        expect(response.body.error).toContain('Blog validation failed')
    })

    test('missing url property results in status code 400 - Bad Request', async () => {

        const newBlog = {
            title: 'test blog',
            author: 'test author',
            likes: 0
        }

        const response = await api.post('/api/blogs').send(newBlog).expect(400)
        expect(response.body.error).toContain('Blog validation failed')

    })
})


afterAll(async () => {
    await mongoose.connection.close()
})