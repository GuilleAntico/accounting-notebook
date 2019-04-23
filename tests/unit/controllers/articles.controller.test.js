const { expect } = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');
const { Article } = require('app/models');
const ArticleController = require('app/controllers/articles.controller');
const ApiError = require('app/error/ApiError');

describe('ArticleController Unit Test', ()=> {
    let sandbox;
    before(()=> sandbox = sinon.createSandbox());
    
    describe('Create Article ', () =>{
        const expectedUser = {
            "_id": "5cbe2bcd7edd192f011cc56b",
            "name": "Guillermo",
            "avatar": "http://avatar.com",
            "__v": 0
        };
        
        const expectedArticle = {
            "tags": [
                "another"
            ],
            "_id": "5cbf80879d3dd5b6290764dd",
            "title": "This is my beatiful article 2",
            "text": "this should contain everything i need 2",
            "__v": 0,
            "user": expectedUser
        }
        afterEach(()=> sandbox.restore());
        
        it('should return the article if created successfully', async()=>{
            
            const mongooseSaveStub = sandbox.stub(Article.prototype, 'save').returns(Promise.resolve(expectedArticle));
            const result = await ArticleController.create(expectedArticle);
            expect(mongooseSaveStub.calledOnce).to.equal(true);
            expect(result.isNew).to.equal(true);
        });
    
        it('should reject the promise if could`t save', async()=>{

            const mongooseSaveStub = sandbox.stub(Article.prototype, 'save').returns(Promise.reject(new Error('something went wrong')));
            
            try{
                await ArticleController.create(expectedArticle);
            }catch(e){
                expect(e).to.be.instanceof(Error);
                expect(e.message).to.equal('something went wrong');
                expect(mongooseSaveStub.calledOnce).to.equal(true);
            }

        });
    });
    
    describe('Update Article ', () =>{
        const expectedUser = {
            "_id": "5cbe2bcd7edd192f011cc56b",
            "name": "Guillermo",
            "avatar": "http://avatar.com",
            "__v": 0
        };
        
        const expectedArticle = {
            "tags": [
                "another"
            ],
            "_id": "5cbf80879d3dd5b6290764dd",
            "title": "This is my beatiful article 2",
            "text": "this should contain everything i need 2",
            "__v": 0,
            "user": expectedUser
        }
        afterEach(()=> sandbox.restore());
        
        it('should return the article if created successfully', async()=>{
            const articleId = '5cbf80879d3dd5b6290764dd';
            const mongooseUpdateStub = sandbox.stub(Article, 'findOneAndUpdate').returns(Promise.resolve(expectedArticle));
            const result = await ArticleController.update(articleId, expectedArticle);
            expect(mongooseUpdateStub.calledOnce).to.equal(true);
            expect(result).to.deep.equal(expectedArticle);
        });
        
        it('should reject the promise if could not update', async()=>{
            
            const mongooseUpdateStub = sandbox.stub(Article, 'findOneAndUpdate').returns(Promise.reject(new ApiError('NotFound')));
            try{
                const articleId = '5cbf80879d3dd5b6290764dd';
                await ArticleController.update(articleId,expectedArticle);
            }catch(e){
                expect(e).to.be.instanceof(ApiError);
                expect(e.message).to.equal('Not found');
                expect(mongooseUpdateStub.calledOnce).to.equal(true);
            }
            
        });
    });
    
    describe('Delete Article ', () =>{
        
        const articleId = '5cbf80879d3dd5b6290764dd';
        const expectedValue = { status : "ok", code: 200};
        afterEach(()=> sandbox.restore());
        
        it('should return ok if deleted', async()=>{
            const mongooseUpdateStub = sandbox.stub(Article, 'deleteOne').returns(Promise.resolve(expectedValue));
            const result = await ArticleController.delete(articleId);
            expect(mongooseUpdateStub.calledOnce).to.equal(true);
            expect(result).to.deep.equal(expectedValue);
        });
    });
    
    describe('Search Article ', () =>{
    
        const expectedUser = {
            "_id": "5cbe2bcd7edd192f011cc56b",
            "name": "Guillermo",
            "avatar": "http://avatar.com",
            "__v": 0
        };
    
        const expectedArticle = [
            {
                "tags": [
                    "another"
                ],
                "_id": "5cbf80879d3dd5b6290764dd",
                "title": "This is my beatiful article 2",
                "text": "this should contain everything i need 2",
                "__v": 0,
                "user": expectedUser
            }
        ]
        const query = 'tags=tag1,tag2&title=title'
        afterEach(()=> sandbox.restore());
        
        it('should return ok if found', async()=>{
            sinon.mock(Article)
            .expects('find')
            .chain('populate')
            .withArgs('user')
            .resolves(expectedArticle);
    
            const result = await ArticleController.search(query);
            
            expect(result).to.deep.equal(expectedArticle);
        });
    });
});