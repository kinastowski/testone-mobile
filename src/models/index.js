// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Task, UserTask, User } = initSchema(schema);

export {
  Task,
  UserTask,
  User
};