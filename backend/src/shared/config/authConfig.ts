import "dotenv/config"

const secret = process.env['JWT_SECRET'];

if(!secret) {
    throw new Error("JWT_SECRET is missing!")
}

export const authConfig = {
    jwt:  {
        secret,
        expiresIn: '1d'
    }
} as const