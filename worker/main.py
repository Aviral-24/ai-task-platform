import asyncio
import os
from bullmq import Worker
from motor.motor_asyncio import AsyncIOMotorClient
from bson.objectid import ObjectId

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

client = AsyncIOMotorClient(MONGO_URI)
db = client.ai_task_platform
tasks_collection = db.tasks

async def process_task(job, job_token):
    task_id = job.data.get('taskId')
    input_text = job.data.get('inputText')
    operation = job.data.get('operationType')

    print(f"[\u2193] Task Picked: ID={task_id} | Operation={operation}")

    await tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {"status": "Running", "logs": "Worker picked up the task."}}
    )

    try:
        result = ""
        if operation == 'Uppercase':
            result = input_text.upper()
        elif operation == 'Lowercase':
            result = input_text.lower()
        elif operation == 'Reverse String':
            result = input_text[::-1]
        elif operation == 'Word Count':
            result = str(len(input_text.split()))
        else:
            raise ValueError("Invalid Operation")

        await tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": "Success", "result": result, "logs": "Task completed successfully."}}
        )
        print(f"[\u2713] Task Completed: Result = '{result}'\n")
        return result

    except Exception as e:
        await tasks_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": {"status": "Failed", "logs": f"Error: {str(e)}"}}
        )
        print(f"[\u2717] Task Failed: {str(e)}\n")
        raise e

async def main():
  
    redis_opts = {
        "host": REDIS_HOST,
        "port": REDIS_PORT
    }
    print(f"Python Worker Started. Connected to Redis at {REDIS_HOST}:{REDIS_PORT}...\n")
    
    worker = Worker("ai-tasks", process_task, {"connection": redis_opts})
    
    await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())