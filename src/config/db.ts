import {PrismaClient} from '../generated/prisma/client.js'
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg(
    {url: process.env.DATABASE_URL,}
)
const prisma = new PrismaClient({adapter})

export const connectDB = async () => {
    try{
        await prisma.$connect()
        console.log('Connected to DB via Prisma')
    }
    catch(err){
        console.error("database connexion error ", err)
    }
}
export const disconnectDB =  async ()=>{
    await prisma.$disconnect()
}
export default prisma