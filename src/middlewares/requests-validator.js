import rateLimit from "express-rate-limit";

const reqLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50
})

export default reqLimiter