/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDraftTask = /* GraphQL */ `
  subscription OnCreateDraftTask(
    $filter: ModelSubscriptionDraftTaskFilterInput
  ) {
    onCreateDraftTask(filter: $filter) {
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
export const onUpdateDraftTask = /* GraphQL */ `
  subscription OnUpdateDraftTask(
    $filter: ModelSubscriptionDraftTaskFilterInput
  ) {
    onUpdateDraftTask(filter: $filter) {
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
export const onDeleteDraftTask = /* GraphQL */ `
  subscription OnDeleteDraftTask(
    $filter: ModelSubscriptionDraftTaskFilterInput
  ) {
    onDeleteDraftTask(filter: $filter) {
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
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($filter: ModelSubscriptionTaskFilterInput) {
    onCreateTask(filter: $filter) {
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
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($filter: ModelSubscriptionTaskFilterInput) {
    onUpdateTask(filter: $filter) {
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
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($filter: ModelSubscriptionTaskFilterInput) {
    onDeleteTask(filter: $filter) {
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
export const onCreateInvoices = /* GraphQL */ `
  subscription OnCreateInvoices($filter: ModelSubscriptionInvoicesFilterInput) {
    onCreateInvoices(filter: $filter) {
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
export const onUpdateInvoices = /* GraphQL */ `
  subscription OnUpdateInvoices($filter: ModelSubscriptionInvoicesFilterInput) {
    onUpdateInvoices(filter: $filter) {
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
export const onDeleteInvoices = /* GraphQL */ `
  subscription OnDeleteInvoices($filter: ModelSubscriptionInvoicesFilterInput) {
    onDeleteInvoices(filter: $filter) {
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
export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport($filter: ModelSubscriptionReportFilterInput) {
    onCreateReport(filter: $filter) {
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
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport($filter: ModelSubscriptionReportFilterInput) {
    onUpdateReport(filter: $filter) {
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
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport($filter: ModelSubscriptionReportFilterInput) {
    onDeleteReport(filter: $filter) {
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
export const onCreateUserTask = /* GraphQL */ `
  subscription OnCreateUserTask($filter: ModelSubscriptionUserTaskFilterInput) {
    onCreateUserTask(filter: $filter) {
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
export const onUpdateUserTask = /* GraphQL */ `
  subscription OnUpdateUserTask($filter: ModelSubscriptionUserTaskFilterInput) {
    onUpdateUserTask(filter: $filter) {
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
export const onDeleteUserTask = /* GraphQL */ `
  subscription OnDeleteUserTask($filter: ModelSubscriptionUserTaskFilterInput) {
    onDeleteUserTask(filter: $filter) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
