import { defineController } from './$relay'
import { updateTask, deleteTask } from '$/service/tasks'

export default defineController(() => ({
  patch: async ({ body, params }) => {
    const task = await updateTask(params.taskId, body.status)
    return { status: 200, body: task }
  },
  delete: async ({ params }) => {
    await deleteTask(params.taskId)
    return { status: 204 }
  }
}))
