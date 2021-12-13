import dotenv from 'dotenv'

dotenv.config();
export default {
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_TOKEN:process.env.JWT_TOKEN,
    PAYPAL_CLIENT_ID:process.env.PAYPAL_CLIENT_ID
}