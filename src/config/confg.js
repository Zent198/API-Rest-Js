import 'dotenv/config';

export const config = {
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        name: process.env.DB_NAME,
    },

    jwt: {
        secret: process.env.JWT_SECRET,
        expires: '2h',
    },

   port: process.env.PORT || 3000
};