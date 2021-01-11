import 'dotenv/config';

export const Env = {
    MongoUrl: process.env.MONGO_URI,
    Port: Number(process.env.PORT),
    CloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    CloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    CloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME
}