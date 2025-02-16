import { config } from 'dotenv';
config();

const _conf = Object.freeze({
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI
});

export default _conf;
