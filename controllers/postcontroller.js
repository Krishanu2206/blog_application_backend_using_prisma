const prisma = require('../prisma/index');

//create a new post
exports.createpost = async(req, res, next)=>{
    try {
        const {slug, title, body} = req.body;
        if(!slug || !title || !body ){
            throw new Error('Please provide all fields');
        }
        const result = await prisma.post.create({
            data : {
                slug,
                title,
                body,
                author: {
                    connect: { id: req.user.id }
                }
            }
        });
        res.status(200).send({
            success : true,
            message : "Post created successfully",
            result
        })
    } catch (error) {
        throw new Error(error);
    }
}

// update post
exports.updatepost = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const {title, body} = req.body;
        const updatedpost = await prisma.post.update({
            where : {
                id : id
            },
            data : {
                title,
                body
            }
        })
        res.status(200).send({
            success : true,
            message : "Post updated successfully",
            updatedpost
        })
    } catch (error) {
        throw new Error(error);
    }
}

//delete post
exports.deletepost = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const deletedpost = await prisma.post.delete({
            where : {
                id : id
            }
        })
        res.status(200).send({
            success : true,
            message : "Post deleted successfully",
            deletedpost
        })
    } catch (error) {
        throw new Error(error);
    }
}

//get all posts
exports.getallposts = async(req, res, next)=>{
    try {
        const posts = await prisma.post.findMany();
        res.status(200).send({
            success : true,
            message : "Posts fetched successfully",
            posts
        })
    } catch (error) {
        throw new Error(error);
    }
}

//get user posts
exports.getuserposts = async(req, res, next)=>{
    try {
        const posts = await prisma.post.findMany({
            where : {
                author : {
                    id : req.user.id
                }
            }
        });
        if(posts.length === 0) {
            return res.status(200).send({
            success : true,
            message : "You haven't posted yet! Create your first post!",
            name : req.user.name,
            email : req.user.email,
        })};
        res.status(200).send({
            success : true,
            message : "Posts of user fetched successfully",
            name : req.user.name,
            email : req.user.email,
            posts
        })
    } catch (error) {
        throw new Error(error);
    }
}