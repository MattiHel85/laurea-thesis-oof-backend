import mongoose from 'mongoose';
import { getAllBlogs, addBlog, getBlogById, updateBlogById, deleteBlogById } from '../src/controllers/blogControllers';
import { BlogModel } from '../src/models/blog';
import dotenv from 'dotenv';

dotenv.config();

interface mockRequestBody {
    title: string;
    content: string;
    author: string;
};

const mockRequest = (body: mockRequestBody = {title: '', content: '', author: ''}, params = {}) => ({
    body,
    params
});

const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Blog Controller', () => {
    let blogId: string;

    const mongoPass = process.env.MONGO_PASS;
    const uri = `mongodb+srv://mattrcsimpson:${mongoPass}@cluster0.6lvmky3.mongodb.net/?retryWrites=true&w=majority`;

    beforeEach(async () => {
        await mongoose.connect(uri);

        mongoose.connection.on("error", (err: Error) => console.log(`Connection Error: ${err}`));
        mongoose.connection.once("open", () => console.log("Connected to the blog database!"));
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('should create a new blog', async () => {
        const req = mockRequest({
            title: 'First Blog Post',
            content: 'This is the content of the first blog post.',
            author: 'John Doe'
        });
        const res = mockResponse();

        await addBlog(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: `Blog: ${req.body.title} successfully created` }));

        const createdBlog = await BlogModel.findOne({ title: req.body.title });
        createdBlog ? blogId = createdBlog._id.toString() : null;
    }, 50000);

    test('should get all blogs', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await getAllBlogs(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    }, 50000);

    test('should get a blog by ID', async () => {
        const req = mockRequest({title: '', content: '', author: ''}, { id: blogId });
        const res = mockResponse();

        await getBlogById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        const expectedBlog = await BlogModel.findById(blogId);
        expectedBlog ? expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: expectedBlog.title })) : null;
    }, 50000);

    test('should update a blog by ID', async () => {
        const req = mockRequest({
            title: 'Updated Blog Post',
            content: 'Updated content of the blog post.',
            author: 'John Smith'
        }, { id: blogId });
        const res = mockResponse();

        await updateBlogById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: `Data updated for: ${req.body.title}` }));
    }, 50000);

    test('should delete a blog by ID', async () => {
        const req = mockRequest({title: '', content: '', author: ''}, { id: blogId });
        const res = mockResponse();

        await deleteBlogById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: `Blog with ID "${blogId}" deleted successfully` }));
    }, 50000);
});