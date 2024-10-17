const prisma = require('../prisma/index');

const isowner = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const post = await prisma.post.findUnique({
            where: {
                id : id
            }
        });
        if(!post){
            return res.status(404).send({
                success : false,
                message : 'Post not found!'
            });
        }
        if(post.authorId !== req.user.id){
            return res.status(404).send({
                success : false,
                message : 'You are not the author of this post!'
            });
        }
        next();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = isowner;