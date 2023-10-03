import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import { DataStore } from "aws-amplify";
import { Task, UserTask } from "../models"; // Adjust with your actual path

interface State {
  otherTasks: Task[];
  myTasks: Task[];
  userTasks: UserTask[];
}

interface Action {
  type: "SET_TASKS" | "SET_USER_TASKS" | "ADD_TASK" | "ADD_USER_TASK";
  payload: Task[] | UserTask[] | Task | UserTask;
}

const initialState: State = {
  otherTasks: [],
  myTasks: [],
  userTasks: [],
};

const taskReducer = (state: State, action: Action): State => {
  console.log("action", action.payload);

  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        otherTasks: action.payload.other.sort(
          (a, b) => b._lastChangedAt - a._lastChangedAt
        ) as Task[],
        myTasks: action.payload.my.sort(
          (a, b) => b._lastChangedAt - a._lastChangedAt
        ) as Task[],
      };
    case "SET_USER_TASKS":
      return { ...state, userTasks: action.payload as UserTask[] };
    case "ADD_TASK":
      return {
        ...state,
        otherTasks: [action.payload as Task, ...state.otherTasks],
      };
    case "ADD_USER_TASK": {
      const task = state.otherTasks.find(
        (task) => task.id === (action.payload as UserTask).taskId
      );

      return {
        ...state,
        otherTasks: state.otherTasks.filter(
          (task: Task) => task.id !== (action.payload as UserTask).taskId
        ),
        myTasks: [task as Task, ...state.myTasks].sort(
          (a, b) => b._lastChangedAt - a._lastChangedAt
        ),
        userTasks: [action.payload as UserTask, ...state.userTasks],
      };
    }
    case "DELETE_TASK":
      return {
        ...state,
        otherTasks: state.otherTasks.filter(
          (task: Task) => task.id !== (action.payload as Task).id
        ),
        myTasks: state.myTasks.filter(
          (task: Task) => task.id !== (action.payload as Task).id
        ),
      };
    case "DELETE_USER_TASK": {
      const task = state.myTasks.find(
        (task) => task.id === (action.payload as UserTask).taskId
      );

      return {
        ...state,
        otherTasks: [task as Task, ...state.otherTasks],
        myTasks: state.myTasks.filter(
          (task: Task) => task.id !== (action.payload as UserTask).taskId
        ),
        userTasks: state.userTasks.filter(
          (userTask) => userTask.id !== (action.payload as UserTask).id
        ),
      };
    }
    default:
      return state;
  }
};

const TaskContext = createContext<
  { state: State; dispatch: Dispatch<Action> } | undefined
>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    // Subscribe to Task and UserTask changes
    const subscriptions = [
      DataStore.observe(Task).subscribe((msg) => {
        if (msg.opType === "INSERT") {
          dispatch({ type: "ADD_TASK", payload: msg.element });
        } else if (msg.opType === "DELETE") {
          dispatch({ type: "DELETE_TASK", payload: msg.element });
        }
        // Handle 'UPDATE' and 'DELETE' opTypes if needed
      }),
      DataStore.observe(UserTask).subscribe((msg) => {
        if (msg.opType === "INSERT") {
          dispatch({ type: "ADD_USER_TASK", payload: msg.element });
        } else if (msg.opType === "DELETE") {
          dispatch({ type: "DELETE_USER_TASK", payload: msg.element });
        }

        // Handle 'UPDATE' and 'DELETE' opTypes if needed
      }),
    ];

    return () => {
      // Cleanup subscriptions on component unmount
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [dispatch]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
