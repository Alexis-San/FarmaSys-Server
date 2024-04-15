import dotenv from 'dotenv';
import Server from './models/server';



 async function main() {
    //configurar dot.env
dotenv.config();
const server = new Server();

server.listen();
 }

