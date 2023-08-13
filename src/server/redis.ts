import { Redis } from "ioredis";

const getRedisUrl = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  return "";
};

const redisUrl = getRedisUrl();

export const redis = new Redis(redisUrl);
