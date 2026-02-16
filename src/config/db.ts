import {PrismaClient} from '../generated/prisma/client.js'
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";


const adapter = new PrismaBetterSqlite3(
    {url: 'file:../dev.db',}
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