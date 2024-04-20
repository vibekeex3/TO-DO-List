import { supabase } from '@/api/supabase'

const TABLE_NAME = 'tasks'

export const fetchAllTasks = async () => {
  const { data, error } = await supabase.from(TABLE_NAME)
    .select('*')
    .order('task_type', { ascending: true }) //new
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const createTask = async (task) => {

  const { error, data } = await supabase.from(TABLE_NAME).insert([task]).select()
  if (error) {
    throw new Error(error.message)
  }
  return data[0]
}

  // export const createTask = async (task) => {
  //   // Adjust the object property to match the Supabase column name
  //   const payload = { ...task, task_type: task.type };
  //   delete payload.type; // Remove the original type property if needed

  //   const { data, error } = await supabase.from(TABLE_NAME).insert([payload]);
  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return data[0];
  // }


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