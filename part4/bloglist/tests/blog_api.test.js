const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require("../models/blog")
const User = require('../models/user')
const testHelper = require('./test_helper')

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

        idArray.forEach(id => expect(id).toBeDefined())
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

    test('updating properties of a blog works', async () => {

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

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await testHelper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await testHelper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})