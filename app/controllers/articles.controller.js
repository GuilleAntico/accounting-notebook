const DevConsole = require('@devConsole');
const { Types } = require('mongoose');
const ApiError = require('app/error/ApiError');
const { Article } = require('app/models');

const devConsole = new DevConsole(__filename);

class ArticleController {
    
    static async create(data) {
        try {
            const article = new Article(data);
            await article.save();
            return article;
        }catch(error){
            devConsole.error('Error creating article: ', error.message);
            return Promise.reject(error);
        }
    }
    
    static async update(articleId, data) {
        try {
            const result = await Article.findOneAndUpdate(
            {_id: new Types.ObjectId(articleId)},
            {$set: data},
            {new: true}
            );
            if(!result) throw new ApiError('NotFound', `Article with Id ${articleId} Not Found`);
            return result
        }catch(error){
            devConsole.error('Error updating article: ', error.message);
            return Promise.reject(error);
        }
    }
    
    static async delete(articleId){
        try{
            return await Article.deleteOne({_id: new Types.ObjectId(articleId)})
        }catch(error){
            devConsole.error('Error deleting article: ', error.message);
            return Promise.reject(error);
        }
    }
    
    static async search(query){
        try{
            const searchCriteria = {...query};
            if(searchCriteria.tags){
                searchCriteria.tags = { $in: searchCriteria.tags.split(',')};
            }
            return await Article.find(searchCriteria)
            .populate('user');
        }catch(error){
            devConsole.error('Error searching articles: ', error.message);
            return Promise.reject(error);
        }
    }
}

module.exports = ArticleController;