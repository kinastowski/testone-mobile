// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DraftTask, Task, UserTask, User } = initSchema(schema);

export {
  DraftTask,
  Task,
  UserTask,
  User
};