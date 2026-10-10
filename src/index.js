require('dotenv').config();
const app=require('./app');
const prisma=require('./config/prisma');
const PORT=process.env.PORT||3001;
const server=app.listen(PORT,()=>console.log('Server running on port '+PORT));
process.on('SIGINT',()=>server.close(async()=>{await prisma.$disconnect();process.exit(0);}));
