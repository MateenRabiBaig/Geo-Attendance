import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'geo-attendance',
  location: 'us-east4'
};

export const createGeofenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGeofence', inputVars);
}
createGeofenceRef.operationName = 'CreateGeofence';

export function createGeofence(dcOrVars, vars) {
  return executeMutation(createGeofenceRef(dcOrVars, vars));
}

export const listGeofencesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGeofences');
}
listGeofencesRef.operationName = 'ListGeofences';

export function listGeofences(dc) {
  return executeQuery(listGeofencesRef(dc));
}

export const assignGeofenceToUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignGeofenceToUser', inputVars);
}
assignGeofenceToUserRef.operationName = 'AssignGeofenceToUser';

export function assignGeofenceToUser(dcOrVars, vars) {
  return executeMutation(assignGeofenceToUserRef(dcOrVars, vars));
}

export const getUserAttendanceRecordsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserAttendanceRecords', inputVars);
}
getUserAttendanceRecordsRef.operationName = 'GetUserAttendanceRecords';

export function getUserAttendanceRecords(dcOrVars, vars) {
  return executeQuery(getUserAttendanceRecordsRef(dcOrVars, vars));
}

