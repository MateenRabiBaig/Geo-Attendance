import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AssignGeofenceToUserData {
  employeeGeofence_insert: EmployeeGeofence_Key;
}

export interface AssignGeofenceToUserVariables {
  userId: UUIDString;
  geofenceId: UUIDString;
}

export interface AttendanceRecord_Key {
  id: UUIDString;
  __typename?: 'AttendanceRecord_Key';
}

export interface CreateGeofenceData {
  geofence_insert: Geofence_Key;
}

export interface CreateGeofenceVariables {
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  description?: string | null;
}

export interface EmployeeGeofence_Key {
  userId: UUIDString;
  geofenceId: UUIDString;
  __typename?: 'EmployeeGeofence_Key';
}

export interface Geofence_Key {
  id: UUIDString;
  __typename?: 'Geofence_Key';
}

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

export interface GetUserAttendanceRecordsVariables {
  userId: UUIDString;
}

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

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateGeofenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGeofenceVariables): MutationRef<CreateGeofenceData, CreateGeofenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGeofenceVariables): MutationRef<CreateGeofenceData, CreateGeofenceVariables>;
  operationName: string;
}
export const createGeofenceRef: CreateGeofenceRef;

export function createGeofence(vars: CreateGeofenceVariables): MutationPromise<CreateGeofenceData, CreateGeofenceVariables>;
export function createGeofence(dc: DataConnect, vars: CreateGeofenceVariables): MutationPromise<CreateGeofenceData, CreateGeofenceVariables>;

interface ListGeofencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGeofencesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGeofencesData, undefined>;
  operationName: string;
}
export const listGeofencesRef: ListGeofencesRef;

export function listGeofences(): QueryPromise<ListGeofencesData, undefined>;
export function listGeofences(dc: DataConnect): QueryPromise<ListGeofencesData, undefined>;

interface AssignGeofenceToUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AssignGeofenceToUserVariables): MutationRef<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AssignGeofenceToUserVariables): MutationRef<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;
  operationName: string;
}
export const assignGeofenceToUserRef: AssignGeofenceToUserRef;

export function assignGeofenceToUser(vars: AssignGeofenceToUserVariables): MutationPromise<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;
export function assignGeofenceToUser(dc: DataConnect, vars: AssignGeofenceToUserVariables): MutationPromise<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;

interface GetUserAttendanceRecordsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAttendanceRecordsVariables): QueryRef<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserAttendanceRecordsVariables): QueryRef<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
  operationName: string;
}
export const getUserAttendanceRecordsRef: GetUserAttendanceRecordsRef;

export function getUserAttendanceRecords(vars: GetUserAttendanceRecordsVariables): QueryPromise<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
export function getUserAttendanceRecords(dc: DataConnect, vars: GetUserAttendanceRecordsVariables): QueryPromise<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;

