import { PrismaClient } from '../generated/prisma/client.js'
import { PrismaPg } from "@prisma/adapter-pg"
import pg from 'pg'

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
    adapter
})

export const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log('✅ Connected to DB via Prisma')
    } catch (err) {
        console.error("❌ Database connection error:", err)
    }
}

export const disconnectDB = async () => {
    await prisma.$disconnect()
}

export default prisma
