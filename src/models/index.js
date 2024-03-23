// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DraftTask, Task, Invoices, Report, UserTask, User } = initSchema(schema);

export {
  DraftTask,
  Task,
  Invoices,
  Report,
  UserTask,
  User
};