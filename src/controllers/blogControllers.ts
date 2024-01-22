const BlogModel = require('../models/blog');

// get all blogs
const getAllBlogs = async (req: any, res: any) => {
    const AllBlogs = await BlogModel.find({});
    res.status(200).json(AllBlogs);
}

// add blog
const addBlog = async (req: any, res: any) => {
    const {title, content, author} = req.body;
    try {
        const newBlog = new BlogModel({
            title,
            content,
            author
        });
        await newBlog.save();

        return res.status(200).json({message: `Blog: ${newBlog.title} successfully created`});
    } catch (err){
        return res.status(500).json({ err: `${res.message}, bro!`})
    }
}

// fetch blog by id
const getBlogById = async (req: any, res: any) => {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    !blog ? 
    res.status(500).json({ error: `Blog with id '${id}' not found`}) :
    res.status(200).json(blog);
}

// update blog by id
const updateBlogById = async (req: any, res: any) => {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndUpdate(id, req.body,{ runValidators: true, new: true})
    !blog ?
    res.status(500).json({error: 'An error occurred.'}) :
    res.status(200).json({message: `Data updated for: ${blog.title}`})
}

// delete blog by id
const deleteBlogById = async (req: any, res: any) => {
    const { id } = req.params;
    const blog = await BlogModel.findByIdAndDelete(id, req.body, { runValidators: true, new: true})
    !blog ?
    res.status(500).json({error: 'An error occurred.'}) :
    res.status(200).json({message: `Data deleted for: ${blog.title}`});
};

export {
    getAllBlogs,
    addBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById
}