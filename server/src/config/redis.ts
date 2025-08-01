import pkg from "ioredis";

const Redis = pkg.default;
const redis = new Redis(process.env.REDIS_URL!);

export default redis;
