/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: String) {
    getCompany(id: $id)
  }
`;
export const getData = /* GraphQL */ `
  query GetData($id: String) {
    getData(id: $id)
  }
`;
export const generateReport = /* GraphQL */ `
  query GenerateReport($id: String) {
    generateReport(id: $id)
  }
`;
export const downloadReport = /* GraphQL */ `
  query DownloadReport($id: String) {
    downloadReport(id: $id)
  }
`;
export const paymentInitTpay = /* GraphQL */ `
  query PaymentInitTpay($invoiceId: String, $amount: String) {
    paymentInitTpay(invoiceId: $invoiceId, amount: $amount)
  }
`;
export const getDraftTask = /* GraphQL */ `
  query GetDraftTask($id: ID!) {
    getDraftTask(id: $id) {
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
export const listDraftTasks = /* GraphQL */ `
  query ListDraftTasks(
    $filter: ModelDraftTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDraftTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncDraftTasks = /* GraphQL */ `
  query SyncDraftTasks(
    $filter: ModelDraftTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDraftTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTasks = /* GraphQL */ `
  query SyncTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getInvoices = /* GraphQL */ `
  query GetInvoices($id: ID!) {
    getInvoices(id: $id) {
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
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncInvoices = /* GraphQL */ `
  query SyncInvoices(
    $filter: ModelInvoicesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInvoices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
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
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncReports = /* GraphQL */ `
  query SyncReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUserTask = /* GraphQL */ `
  query GetUserTask($id: ID!) {
    getUserTask(id: $id) {
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
export const listUserTasks = /* GraphQL */ `
  query ListUserTasks(
    $filter: ModelUserTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUserTasks = /* GraphQL */ `
  query SyncUserTasks(
    $filter: ModelUserTaskFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserTasks(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
      __typename
    }
  }
`;
