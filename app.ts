import dotenv from 'dotenv';
import Server from './src/models/server';

dotenv.config();

try {
    console.log('Creating server instance');
    const server = new Server();
    console.log('Calling server.listen()');
    server.listen();
} catch (error) {
    console.error('Error starting the app:', error);
}
