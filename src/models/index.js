// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserTask, Task, User } = initSchema(schema);

export {
  UserTask,
  Task,
  User
};