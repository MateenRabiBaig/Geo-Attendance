# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListGeofences*](#listgeofences)
  - [*GetUserAttendanceRecords*](#getuserattendancerecords)
- [**Mutations**](#mutations)
  - [*CreateGeofence*](#creategeofence)
  - [*AssignGeofenceToUser*](#assigngeofencetouser)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListGeofences
You can execute the `ListGeofences` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGeofences(): QueryPromise<ListGeofencesData, undefined>;

interface ListGeofencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGeofencesData, undefined>;
}
export const listGeofencesRef: ListGeofencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGeofences(dc: DataConnect): QueryPromise<ListGeofencesData, undefined>;

interface ListGeofencesRef {
  ...
  (dc: DataConnect): QueryRef<ListGeofencesData, undefined>;
}
export const listGeofencesRef: ListGeofencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGeofencesRef:
```typescript
const name = listGeofencesRef.operationName;
console.log(name);
```

### Variables
The `ListGeofences` query has no variables.
### Return Type
Recall that executing the `ListGeofences` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGeofencesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGeofencesData {
  geofences: ({
    id: UUIDString;
    name: string;
    latitude: number;
    longitude: number;
    radius: number;
    description?: string | null;
  } & Geofence_Key)[];
}
```
### Using `ListGeofences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGeofences } from '@dataconnect/generated';


// Call the `listGeofences()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGeofences();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGeofences(dataConnect);

console.log(data.geofences);

// Or, you can use the `Promise` API.
listGeofences().then((response) => {
  const data = response.data;
  console.log(data.geofences);
});
```

### Using `ListGeofences`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGeofencesRef } from '@dataconnect/generated';


// Call the `listGeofencesRef()` function to get a reference to the query.
const ref = listGeofencesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGeofencesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.geofences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.geofences);
});
```

## GetUserAttendanceRecords
You can execute the `GetUserAttendanceRecords` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserAttendanceRecords(vars: GetUserAttendanceRecordsVariables): QueryPromise<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;

interface GetUserAttendanceRecordsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAttendanceRecordsVariables): QueryRef<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
}
export const getUserAttendanceRecordsRef: GetUserAttendanceRecordsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserAttendanceRecords(dc: DataConnect, vars: GetUserAttendanceRecordsVariables): QueryPromise<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;

interface GetUserAttendanceRecordsRef {
  ...
  (dc: DataConnect, vars: GetUserAttendanceRecordsVariables): QueryRef<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
}
export const getUserAttendanceRecordsRef: GetUserAttendanceRecordsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserAttendanceRecordsRef:
```typescript
const name = getUserAttendanceRecordsRef.operationName;
console.log(name);
```

### Variables
The `GetUserAttendanceRecords` query requires an argument of type `GetUserAttendanceRecordsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserAttendanceRecordsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserAttendanceRecords` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserAttendanceRecordsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserAttendanceRecordsData {
  attendanceRecords: ({
    id: UUIDString;
    checkInTime: TimestampString;
    checkOutTime?: TimestampString | null;
    checkInLatitude: number;
    checkInLongitude: number;
    checkOutLatitude?: number | null;
    checkOutLongitude?: number | null;
    status: string;
  } & AttendanceRecord_Key)[];
}
```
### Using `GetUserAttendanceRecords`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserAttendanceRecords, GetUserAttendanceRecordsVariables } from '@dataconnect/generated';

// The `GetUserAttendanceRecords` query requires an argument of type `GetUserAttendanceRecordsVariables`:
const getUserAttendanceRecordsVars: GetUserAttendanceRecordsVariables = {
  userId: ..., 
};

// Call the `getUserAttendanceRecords()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserAttendanceRecords(getUserAttendanceRecordsVars);
// Variables can be defined inline as well.
const { data } = await getUserAttendanceRecords({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserAttendanceRecords(dataConnect, getUserAttendanceRecordsVars);

console.log(data.attendanceRecords);

// Or, you can use the `Promise` API.
getUserAttendanceRecords(getUserAttendanceRecordsVars).then((response) => {
  const data = response.data;
  console.log(data.attendanceRecords);
});
```

### Using `GetUserAttendanceRecords`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserAttendanceRecordsRef, GetUserAttendanceRecordsVariables } from '@dataconnect/generated';

// The `GetUserAttendanceRecords` query requires an argument of type `GetUserAttendanceRecordsVariables`:
const getUserAttendanceRecordsVars: GetUserAttendanceRecordsVariables = {
  userId: ..., 
};

// Call the `getUserAttendanceRecordsRef()` function to get a reference to the query.
const ref = getUserAttendanceRecordsRef(getUserAttendanceRecordsVars);
// Variables can be defined inline as well.
const ref = getUserAttendanceRecordsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserAttendanceRecordsRef(dataConnect, getUserAttendanceRecordsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.attendanceRecords);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.attendanceRecords);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateGeofence
You can execute the `CreateGeofence` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGeofence(vars: CreateGeofenceVariables): MutationPromise<CreateGeofenceData, CreateGeofenceVariables>;

interface CreateGeofenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGeofenceVariables): MutationRef<CreateGeofenceData, CreateGeofenceVariables>;
}
export const createGeofenceRef: CreateGeofenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGeofence(dc: DataConnect, vars: CreateGeofenceVariables): MutationPromise<CreateGeofenceData, CreateGeofenceVariables>;

interface CreateGeofenceRef {
  ...
  (dc: DataConnect, vars: CreateGeofenceVariables): MutationRef<CreateGeofenceData, CreateGeofenceVariables>;
}
export const createGeofenceRef: CreateGeofenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGeofenceRef:
```typescript
const name = createGeofenceRef.operationName;
console.log(name);
```

### Variables
The `CreateGeofence` mutation requires an argument of type `CreateGeofenceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGeofenceVariables {
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateGeofence` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGeofenceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGeofenceData {
  geofence_insert: Geofence_Key;
}
```
### Using `CreateGeofence`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGeofence, CreateGeofenceVariables } from '@dataconnect/generated';

// The `CreateGeofence` mutation requires an argument of type `CreateGeofenceVariables`:
const createGeofenceVars: CreateGeofenceVariables = {
  name: ..., 
  latitude: ..., 
  longitude: ..., 
  radius: ..., 
  description: ..., // optional
};

// Call the `createGeofence()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGeofence(createGeofenceVars);
// Variables can be defined inline as well.
const { data } = await createGeofence({ name: ..., latitude: ..., longitude: ..., radius: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGeofence(dataConnect, createGeofenceVars);

console.log(data.geofence_insert);

// Or, you can use the `Promise` API.
createGeofence(createGeofenceVars).then((response) => {
  const data = response.data;
  console.log(data.geofence_insert);
});
```

### Using `CreateGeofence`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGeofenceRef, CreateGeofenceVariables } from '@dataconnect/generated';

// The `CreateGeofence` mutation requires an argument of type `CreateGeofenceVariables`:
const createGeofenceVars: CreateGeofenceVariables = {
  name: ..., 
  latitude: ..., 
  longitude: ..., 
  radius: ..., 
  description: ..., // optional
};

// Call the `createGeofenceRef()` function to get a reference to the mutation.
const ref = createGeofenceRef(createGeofenceVars);
// Variables can be defined inline as well.
const ref = createGeofenceRef({ name: ..., latitude: ..., longitude: ..., radius: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGeofenceRef(dataConnect, createGeofenceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.geofence_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.geofence_insert);
});
```

## AssignGeofenceToUser
You can execute the `AssignGeofenceToUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
assignGeofenceToUser(vars: AssignGeofenceToUserVariables): MutationPromise<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;

interface AssignGeofenceToUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignGeofenceToUserVariables): MutationRef<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;
}
export const assignGeofenceToUserRef: AssignGeofenceToUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
assignGeofenceToUser(dc: DataConnect, vars: AssignGeofenceToUserVariables): MutationPromise<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;

interface AssignGeofenceToUserRef {
  ...
  (dc: DataConnect, vars: AssignGeofenceToUserVariables): MutationRef<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;
}
export const assignGeofenceToUserRef: AssignGeofenceToUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the assignGeofenceToUserRef:
```typescript
const name = assignGeofenceToUserRef.operationName;
console.log(name);
```

### Variables
The `AssignGeofenceToUser` mutation requires an argument of type `AssignGeofenceToUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AssignGeofenceToUserVariables {
  userId: UUIDString;
  geofenceId: UUIDString;
}
```
### Return Type
Recall that executing the `AssignGeofenceToUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AssignGeofenceToUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AssignGeofenceToUserData {
  employeeGeofence_insert: EmployeeGeofence_Key;
}
```
### Using `AssignGeofenceToUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, assignGeofenceToUser, AssignGeofenceToUserVariables } from '@dataconnect/generated';

// The `AssignGeofenceToUser` mutation requires an argument of type `AssignGeofenceToUserVariables`:
const assignGeofenceToUserVars: AssignGeofenceToUserVariables = {
  userId: ..., 
  geofenceId: ..., 
};

// Call the `assignGeofenceToUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await assignGeofenceToUser(assignGeofenceToUserVars);
// Variables can be defined inline as well.
const { data } = await assignGeofenceToUser({ userId: ..., geofenceId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await assignGeofenceToUser(dataConnect, assignGeofenceToUserVars);

console.log(data.employeeGeofence_insert);

// Or, you can use the `Promise` API.
assignGeofenceToUser(assignGeofenceToUserVars).then((response) => {
  const data = response.data;
  console.log(data.employeeGeofence_insert);
});
```

### Using `AssignGeofenceToUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, assignGeofenceToUserRef, AssignGeofenceToUserVariables } from '@dataconnect/generated';

// The `AssignGeofenceToUser` mutation requires an argument of type `AssignGeofenceToUserVariables`:
const assignGeofenceToUserVars: AssignGeofenceToUserVariables = {
  userId: ..., 
  geofenceId: ..., 
};

// Call the `assignGeofenceToUserRef()` function to get a reference to the mutation.
const ref = assignGeofenceToUserRef(assignGeofenceToUserVars);
// Variables can be defined inline as well.
const ref = assignGeofenceToUserRef({ userId: ..., geofenceId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = assignGeofenceToUserRef(dataConnect, assignGeofenceToUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.employeeGeofence_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.employeeGeofence_insert);
});
```

