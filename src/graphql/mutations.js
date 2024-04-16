/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDraftTask = /* GraphQL */ `
  mutation CreateDraftTask(
    $input: CreateDraftTaskInput!
    $condition: ModelDraftTaskConditionInput
  ) {
    createDraftTask(input: $input, condition: $condition) {
      id
      title
      description
      details
      image
      constraints
      stats
      type
      owner
      reward
      other
      max
      spent
      end
      template
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateDraftTask = /* GraphQL */ `
  mutation UpdateDraftTask(
    $input: UpdateDraftTaskInput!
    $condition: ModelDraftTaskConditionInput
  ) {
    updateDraftTask(input: $input, condition: $condition) {
      id
      title
      description
      details
      image
      constraints
      stats
      type
      owner
      reward
      other
      max
      spent
      end
      template
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteDraftTask = /* GraphQL */ `
  mutation DeleteDraftTask(
    $input: DeleteDraftTaskInput!
    $condition: ModelDraftTaskConditionInput
  ) {
    deleteDraftTask(input: $input, condition: $condition) {
      id
      title
      description
      details
      image
      constraints
      stats
      type
      owner
      reward
      other
      max
      spent
      end
      template
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      title
      description
      details
      image
      constraints
      stats
      type
      owner
      reward
      other
      max
      end
      spent
      status
      start
      template
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      title
      description
      details
      image
      constraints
      stats
      type
      owner
      reward
      other
      max
      end
      spent
      status
      start
      template
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      title
      description
      details
      image
      constraints
      stats
      type
      owner
      reward
      other
      max
      end
      spent
      status
      start
      template
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createInvoices = /* GraphQL */ `
  mutation CreateInvoices(
    $input: CreateInvoicesInput!
    $condition: ModelInvoicesConditionInput
  ) {
    createInvoices(input: $input, condition: $condition) {
      id
      currency
      testDetails
      dueDate
      issueDate
      number
      status
      owner
      totalAmount
      subTotalAmount
      taxAmount
      paymentData
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateInvoices = /* GraphQL */ `
  mutation UpdateInvoices(
    $input: UpdateInvoicesInput!
    $condition: ModelInvoicesConditionInput
  ) {
    updateInvoices(input: $input, condition: $condition) {
      id
      currency
      testDetails
      dueDate
      issueDate
      number
      status
      owner
      totalAmount
      subTotalAmount
      taxAmount
      paymentData
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteInvoices = /* GraphQL */ `
  mutation DeleteInvoices(
    $input: DeleteInvoicesInput!
    $condition: ModelInvoicesConditionInput
  ) {
    deleteInvoices(input: $input, condition: $condition) {
      id
      currency
      testDetails
      dueDate
      issueDate
      number
      status
      owner
      totalAmount
      subTotalAmount
      taxAmount
      paymentData
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
      id
      title
      taskId
      settings
      type
      template
      status
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
      id
      title
      taskId
      settings
      type
      template
      status
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
      id
      title
      taskId
      settings
      type
      template
      status
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createUserTask = /* GraphQL */ `
  mutation CreateUserTask(
    $input: CreateUserTaskInput!
    $condition: ModelUserTaskConditionInput
  ) {
    createUserTask(input: $input, condition: $condition) {
      id
      result
      stats
      comment
      taskId
      rec
      owner
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateUserTask = /* GraphQL */ `
  mutation UpdateUserTask(
    $input: UpdateUserTaskInput!
    $condition: ModelUserTaskConditionInput
  ) {
    updateUserTask(input: $input, condition: $condition) {
      id
      result
      stats
      comment
      taskId
      rec
      owner
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteUserTask = /* GraphQL */ `
  mutation DeleteUserTask(
    $input: DeleteUserTaskInput!
    $condition: ModelUserTaskConditionInput
  ) {
    deleteUserTask(input: $input, condition: $condition) {
      id
      result
      stats
      comment
      taskId
      rec
      owner
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      profile
      tasks
      userTasks
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      profile
      tasks
      userTasks
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      profile
      tasks
      userTasks
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
