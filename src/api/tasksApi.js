import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*')
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const createTask = async (task) => {
  debugger
  const { error, data } = await supabase.from(TABLE_NAME).insert(task).select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}



export const deleteSingleTask = async (task) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', task)
  if (error) {
    throw new Error(error.message)
  }
  return true
}


export const updateSingleTask = async (task) => {
  const { data, error } = await supabase.from(TABLE_NAME).update(task).eq('id', task.id).select()

  if (error) {
    throw new Error(error.message)
  }

  return data[0]
}