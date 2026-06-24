import { CreateGeofenceData, CreateGeofenceVariables, ListGeofencesData, AssignGeofenceToUserData, AssignGeofenceToUserVariables, GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateGeofence(options?: useDataConnectMutationOptions<CreateGeofenceData, FirebaseError, CreateGeofenceVariables>): UseDataConnectMutationResult<CreateGeofenceData, CreateGeofenceVariables>;
export function useCreateGeofence(dc: DataConnect, options?: useDataConnectMutationOptions<CreateGeofenceData, FirebaseError, CreateGeofenceVariables>): UseDataConnectMutationResult<CreateGeofenceData, CreateGeofenceVariables>;

export function useListGeofences(options?: useDataConnectQueryOptions<ListGeofencesData>): UseDataConnectQueryResult<ListGeofencesData, undefined>;
export function useListGeofences(dc: DataConnect, options?: useDataConnectQueryOptions<ListGeofencesData>): UseDataConnectQueryResult<ListGeofencesData, undefined>;

export function useAssignGeofenceToUser(options?: useDataConnectMutationOptions<AssignGeofenceToUserData, FirebaseError, AssignGeofenceToUserVariables>): UseDataConnectMutationResult<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;
export function useAssignGeofenceToUser(dc: DataConnect, options?: useDataConnectMutationOptions<AssignGeofenceToUserData, FirebaseError, AssignGeofenceToUserVariables>): UseDataConnectMutationResult<AssignGeofenceToUserData, AssignGeofenceToUserVariables>;

export function useGetUserAttendanceRecords(vars: GetUserAttendanceRecordsVariables, options?: useDataConnectQueryOptions<GetUserAttendanceRecordsData>): UseDataConnectQueryResult<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
export function useGetUserAttendanceRecords(dc: DataConnect, vars: GetUserAttendanceRecordsVariables, options?: useDataConnectQueryOptions<GetUserAttendanceRecordsData>): UseDataConnectQueryResult<GetUserAttendanceRecordsData, GetUserAttendanceRecordsVariables>;
