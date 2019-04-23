const { expect } = require('chai');
const sinon = require('sinon');
const { User } = require('app/models');
const UserController = require('app/controllers/users.controller');

describe('UserController Unit Test', ()=> {
    let sandbox;
    before(()=> sandbox = sinon.createSandbox());
    
    describe('Create User', () =>{
        let app;
        before( ()=> {
        
        })
        afterEach(()=> sandbox.restore());
        
        it('should return the user if created successfully', async()=>{
            const testUser = {
                _id: '1234',
                name: 'Test',
                avatar: 'http://avatar.com'
            }
            const mongooseSaveStub = sandbox.stub(User.prototype, 'save').returns(Promise.resolve(testUser));
            const result = await UserController.create({ name: testUser.name, avatar: testUser.avatar});
            expect(mongooseSaveStub.calledOnce).to.equal(true);
            expect(result.isNew).to.equal(true);
        })
    
        it('should reject the promise if could`t save', async()=>{
            const testUser = {
                _id: '1234',
                name: 'Test',
                avatar: 'http://avatar.com'
            }
            const mongooseSaveStub = sandbox.stub(User.prototype, 'save').returns(Promise.reject(new Error('something went wrong')));
            
            try{
                await UserController.create({ name: testUser.name, avatar: testUser.avatar});
            }catch(e){
                expect(e).to.be.instanceof(Error);
                expect(e.message).to.equal('something went wrong');
                expect(mongooseSaveStub.calledOnce).to.equal(true);
            }

        })
    })
});