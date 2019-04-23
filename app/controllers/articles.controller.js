const DevConsole = require('@devConsole');
const { Types } = require('mongoose');
const devConsole = new DevConsole(__filename);
const { Article } = require('app/models');

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
            return await Article.findOneAndUpdate(
            {_id: new Types.ObjectId(articleId)},
            {$set: data},
            {new: true}
            ).exec();
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
            .populate('user')
            .exec();
        }catch(error){
            devConsole.error('Error searching articles: ', error.message);
            return Promise.reject(error);
        }
    }
}


module.exports = ArticleController;