const prisma=require('../config/prisma');
exports.list=config=>prisma[config.model].findMany();
exports.create=(config,data)=>prisma[config.model].create({data});
exports.remove=(config,values)=>prisma[config.model].deleteMany({where:Object.fromEntries(config.keys.map((key,index)=>[key,values[index]]))});
