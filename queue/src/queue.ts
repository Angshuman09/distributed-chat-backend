import { Queue } from "bullmq"
import Redis from "ioredis"

export const connection = new (Redis as any)({
  maxRetriesPerRequest: null
})

export const chatQueue = new Queue("chat", {
  connection
})