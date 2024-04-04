import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')

  if (error) {
    throw new Error(error.message)
  }
  return data
}





// crear tarea
export const createTask = async (task) => {
  const { error, data } = await supabase.from(TABLE_NAME).insert(task).select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

//eliminar tarea
export const deleteSingleTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', task)
  if (error) {
    throw new Error(error.message)
  }
  return true
}