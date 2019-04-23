
const articlesController = require('app/controllers/articles.controller');
const DevConsole = require('@devConsole');

const devConsole = new DevConsole(__filename);
const authenticate = require('@authenticate');

module.exports = (app, express) => {
    const api            = express.Router();
    
    
    /**
     * @swagger
     * /articles:
     *    post:
     *      summary: Create a new Article
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: body
     *            name: user
     *            description: The article to create
     *            schema:
     *              type: object
     *              required:
     *                  - title
     *                  - text
     *                  - user
     *                  - tags
     *              properties:
     *                  title:
     *                    type: string
     *                    example: "Article Title"
     *                  text:
     *                    type: string
     *                    example: "This should be the content of the article"
     *                  user:
     *                    type: string
     *                    example: "1234"
     *                  tags:
     *                    type: array
     *                    example: ["tag"]
     *      responses:
     *          200:
     *              description: OK
     *              examples:
     *                  application/json:
     *                      {
     *                          "_id": 1234,
     *                          "title": "Title",
     *                          "text": "this is the text",
     *                          "user": "123456",
     *                          "tags": ["spectacular"]
     *                      }
     *          401:
     *              description: Authorization Error
     *              examples:
     *                  application/json:
     *                      {
     *                          "code": 401,
     *                          "message": "token not present or invalid in header"
     *                      }
     *
     */
    api.post('/', authenticate, async (req, res, next)=>{
        try{
            const data = req.body;
            devConsole.info(`creating article with data ${JSON.stringify(data)}`);
            const article = await articlesController.create(data);
            devConsole.info(`Article created ${JSON.stringify(article)}`);
            res.json(article);
        }catch(error){
            next(error);
        }
        
    });
    /**
     * @swagger
     * /articles/{articleId}:
     *    put:
     *      summary: Update an Article
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: articleId
     *            schema:
     *              type: string
     *            required: true
     *          - in: body
     *            name: user
     *            description: The user to create
     *            schema:
     *              type: object
     *              required:
     *                  - title
     *                  - text
     *                  - tags
     *              properties:
     *                  title:
     *                    type: string
     *                    example: "Article Title"
     *                  text:
     *                    type: string
     *                    example: "This should be the content of the article"
     *                  tags:
     *                    type: array
     *                    example: ["tag"]
     *      responses:
     *          200:
     *              description: OK
     *              examples:
     *                  application/json:
     *                      {
     *                          "_id": 1234,
     *                          "title": "Title",
     *                          "text": "this is the text",
     *                          "user": "123456",
     *                          "tags": ["spectacular"]
     *                      }
     *          401:
     *              description: Authorization Error
     *              examples:
     *                  application/json:
     *                      {
     *                          "code": 401,
     *                          "message": "token not present or invalid in header"
     *                      }
     *
     */
    api.put('/:articleId', authenticate, async (req, res, next)=>{
        try{
            const data = req.body;
            const { articleId } = req.params;
            devConsole.info(`Updating article with id: ${articleId} and data ${JSON.stringify(data)}`);
            const updatedArticle = await articlesController.update(articleId,data);
            devConsole.info(`Article updated ${JSON.stringify(updatedArticle)}`);
            res.json(updatedArticle);
        }catch(error){
            next(error);
        }
    });
    /**
     * @swagger
     * /articles/{articleId}:
     *    delete:
     *      summary: Delete an Article
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: path
     *            name: articleId
     *            schema:
     *              type: string
     *            required: true
     *      responses:
     *          200:
     *              description: OK
     *              examples:
     *                  application/json:
     *                      {
     *                          "_id": 1234,
     *                          "title": "Title",
     *                          "text": "this is the text",
     *                          "user": "123456",
     *                          "tags": ["spectacular"]
     *                      }
     *          401:
     *              description: Authorization Error
     *              examples:
     *                  application/json:
     *                      {
     *                          "code": 401,
     *                          "message": "token not present or invalid in header"
     *                      }
     *
     */
    api.delete('/:articleId', authenticate, async (req, res, next)=>{
        try{
            const { articleId } = req.params;
            devConsole.info(`Deleting article with id: ${articleId}`);
            const result = await articlesController.delete(articleId);
            devConsole.info(`Article deleted ${JSON.stringify(result)}`);
            res.json({
                status: 'ok',
                code: 200
            });
        }catch(error){
            next(error);
        }
    });
    /**
     * @swagger
     * /articles:
     *    get:
     *      summary: Find Articles
     *      consumes:
     *          - application/json
     *      parameters:
     *          - in: query
     *            name: tags
     *            schema:
     *              type: string
     *              example: tag1,tag2,tag3
     *          - in: query
     *            name: title
     *            schema:
     *              type: string
     *              example: this is a title
     *          - in: query
     *            name: text
     *            schema:
     *              type: string
     *              example: content of article
     *      responses:
     *          200:
     *              description: OK
     *              examples:
     *                  application/json:
     *                      [
     *                          {
     *                              "tags": ["tag1"],
     *                              "_id": "12345",
     *                              "title": "this should contain everything i need",
     *                              "text": "content of article",
     *                              "user": {
     *                                  "_id": "515151515",
     *                                  "name": "Guillermo",
     *                                  "avatar": "http://avatar.com"
     *                              }
     *                          }
     *                      ]
     *          401:
     *              description: Authorization Error
     *              examples:
     *                  application/json:
     *                      {
     *                          "code": 401,
     *                          "message": "token not present or invalid in header"
     *                      }
     *
     */
    api.get('/', authenticate, async (req, res, next)=>{
        try{
            const {query} = req;
            devConsole.info(`searching articles with query: ${query}`);
            const result = await articlesController.search(query);
            devConsole.info(`Article found ${JSON.stringify(result)}`);
            res.json(result);
        }catch(error){
            next(error);
        }
    });
    app.use('/articles', api);
}