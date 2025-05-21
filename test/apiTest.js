import { connect, disconnect } from 'mongoose';
import pactum from 'pactum';
const { settings, spec } = pactum; 

settings.setLogLevel('DEBUG');

const API_HOST = process.env.API_HOST || 'localhost';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/usersdb';

const userEmail = 'jarinsama1@gmail.com';
const userName = 'Jarin Sultana';

describe('API Integration Tests for User Endpoints', () => {
    before(async () => {
        console.log(`Connecting to MongoDB at ${MONGODB_URI}`);
        await connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    });

    it('should create a new user with POST /api/user', async () => {
        console.log(`Testing POST to http://${API_HOST}:3000/api/user`);
        await spec()
            .post(`http://${API_HOST}:3000/api/user`)
            .withJson({ name: userName, email: userEmail })
            .expectStatus(201)
            .expectJsonLike({
                message: 'User created successfully',
                user: { name: userName }
            });
    });

    it('should update user details with PUT /api/user/:email', async () => {
        console.log(`Testing PUT to http://${API_HOST}:3000/api/user/${userEmail}`);
        await spec()
            .put(`http://${API_HOST}:3000/api/user/${userEmail}`)
            .withJson({
                name: 'Updated User',
                email: 'updated.user@example.com'
            })
            .expectStatus(200)
            .expectJsonLike({
                message: 'User updated successfully',
                user: { name: 'Updated User', email: 'updated.user@example.com' }
            });
    });

    it('should delete a user with DELETE /api/user/:email', async () => {
        console.log(`Testing DELETE to http://${API_HOST}:3000/api/user/updated.user@example.com`);
        await spec()
            .delete(`http://${API_HOST}:3000/api/user/${'updated.user@example.com'}`)
            .expectStatus(200)
            .expectJson({ message: 'User deleted successfully' });
    });

    it('should return 404 for GET /api/user/:email after deletion', async () => {
        console.log(`Testing GET to http://${API_HOST}:3000/api/user/updated.user@example.com`);
        await spec()
            .get(`http://${API_HOST}:3000/api/user/${'updated.user@example.com'}`)
            .expectStatus(404)
            .expectJson({ error: 'User not found' });
    });

    after(async () => {
        console.log('Disconnecting from MongoDB');
        await disconnect();
    });
});