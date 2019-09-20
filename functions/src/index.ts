const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Importing functions from files...
const createNewInvoceFunc = require('./accounting/createNewInvoce');
// const enviromentFunctions = require('./environment/environmentFunctions');


/////FUNCTIONS__
///////////////////////////////////////////ACCOUNTING/////////////////////////////////////////////////
export const createNewInvoceDocument =
  functions.firestore.document('departments/accouting/invoices/{invoceId}').onCreate(createNewInvoceFunc.handler);
// export const updateURlWhenPushInvoiceFile = functions.storage.object().onFinalize(createNewInvoceFunc.bb);
//////////////////////////////////////////ENVIRONMENT/////////////////////////////////////////////////
// export const removeMoenaWorker = functions.firestore.document('dashboard/users/data/{id}').onDelete(enviromentFunctions.removeUser);
// export const createNewMoenaWorker = functions.firestore.document('dashboard/users/data/{id}').onDelete(enviromentFunctions.removeUser);
//
