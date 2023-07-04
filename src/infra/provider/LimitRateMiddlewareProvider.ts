import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // Tempo
    max: 10, // Limite de requisições por tempo por cada IP
    standardHeaders: true,
    legacyHeaders: false,
});

export default limiter;