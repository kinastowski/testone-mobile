import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerDraftTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DraftTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly details?: string | null;
  readonly image?: string | null;
  readonly constraints?: string | null;
  readonly stats?: string | null;
  readonly type?: number | null;
  readonly owner?: string | null;
  readonly reward?: number | null;
  readonly other?: string | null;
  readonly max?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDraftTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<DraftTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly details?: string | null;
  readonly image?: string | null;
  readonly constraints?: string | null;
  readonly stats?: string | null;
  readonly type?: number | null;
  readonly owner?: string | null;
  readonly reward?: number | null;
  readonly other?: string | null;
  readonly max?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type DraftTask = LazyLoading extends LazyLoadingDisabled ? EagerDraftTask : LazyDraftTask

export declare const DraftTask: (new (init: ModelInit<DraftTask>) => DraftTask) & {
  copyOf(source: DraftTask, mutator: (draft: MutableModel<DraftTask>) => MutableModel<DraftTask> | void): DraftTask;
}

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly details?: string | null;
  readonly image?: string | null;
  readonly constraints?: string | null;
  readonly stats?: string | null;
  readonly type?: number | null;
  readonly owner?: string | null;
  readonly reward?: number | null;
  readonly other?: string | null;
  readonly end?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly details?: string | null;
  readonly image?: string | null;
  readonly constraints?: string | null;
  readonly stats?: string | null;
  readonly type?: number | null;
  readonly owner?: string | null;
  readonly reward?: number | null;
  readonly other?: string | null;
  readonly end?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
}

type EagerUserTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly result?: string | null;
  readonly stats?: string | null;
  readonly comment?: string | null;
  readonly taskId?: string | null;
  readonly rec?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserTask, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly result?: string | null;
  readonly stats?: string | null;
  readonly comment?: string | null;
  readonly taskId?: string | null;
  readonly rec?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserTask = LazyLoading extends LazyLoadingDisabled ? EagerUserTask : LazyUserTask

export declare const UserTask: (new (init: ModelInit<UserTask>) => UserTask) & {
  copyOf(source: UserTask, mutator: (draft: MutableModel<UserTask>) => MutableModel<UserTask> | void): UserTask;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profile?: string | null;
  readonly tasks?: string | null;
  readonly userTasks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly profile?: string | null;
  readonly tasks?: string | null;
  readonly userTasks?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}