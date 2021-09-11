import { defineController } from './$relay'
import { updateTask, deleteTask } from '$/service/tasks'

export default defineController(() => ({
  patch: async ({ body, params }) => {
    await updateTask(params.taskId, body.status)
    return { status: 204, body: "Task status updated successfully!" }
  },
  delete: async ({ params }) => {
    await deleteTask(params.taskId)
    return { status: 204, body: "Task deleted successfully!" }
  }
}))
