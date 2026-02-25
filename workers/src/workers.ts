import { Worker } from "bullmq"
import { connection } from "../../queue/dist/queue.js"

const pub = connection.duplicate()

new Worker(
  "chat",
  async job => {
    if (job.name === "chat") {
      const { msg } = job.data

      await new Promise(r => setTimeout(r, 500))

      const result = {
        msg,
        time: Date.now()
      }

      await pub.publish("chat-results", JSON.stringify(result))
    }
  },
  { connection }
)

console.log("worker running")