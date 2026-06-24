const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'geo-attendance',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createGeofenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateGeofence', inputVars);
}
createGeofenceRef.operationName = 'CreateGeofence';
exports.createGeofenceRef = createGeofenceRef;

exports.createGeofence = function createGeofence(dcOrVars, vars) {
  return executeMutation(createGeofenceRef(dcOrVars, vars));
};

const listGeofencesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListGeofences');
}
listGeofencesRef.operationName = 'ListGeofences';
exports.listGeofencesRef = listGeofencesRef;

exports.listGeofences = function listGeofences(dc) {
  return executeQuery(listGeofencesRef(dc));
};

const assignGeofenceToUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AssignGeofenceToUser', inputVars);
}
assignGeofenceToUserRef.operationName = 'AssignGeofenceToUser';
exports.assignGeofenceToUserRef = assignGeofenceToUserRef;

exports.assignGeofenceToUser = function assignGeofenceToUser(dcOrVars, vars) {
  return executeMutation(assignGeofenceToUserRef(dcOrVars, vars));
};

const getUserAttendanceRecordsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserAttendanceRecords', inputVars);
}
getUserAttendanceRecordsRef.operationName = 'GetUserAttendanceRecords';
exports.getUserAttendanceRecordsRef = getUserAttendanceRecordsRef;

exports.getUserAttendanceRecords = function getUserAttendanceRecords(dcOrVars, vars) {
  return executeQuery(getUserAttendanceRecordsRef(dcOrVars, vars));
};
