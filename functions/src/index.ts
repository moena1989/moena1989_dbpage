import * as admin from 'firebase-admin';

const functions = require('firebase-functions');
const postmark = require('postmark');
// const cors = require('cors')({origin: true});
const postmarkKey = functions.config().postmark.key;
const mailerClient = new postmark.ServerClient(postmarkKey);
admin.initializeApp();

// firebase functions:config:set postmark.key=239f800c-b206-4963-8650-f6bb4c1c51bf
// firebase deploy --only functions
exports.whenDeletingUser = functions.firestore.document('dashboard/users/data/{id}').onDelete((snapshot: any, context: any) => {
  const d = snapshot.data();
  console.log(d);
  admin.auth().deleteUser(d.uid).then(value => {
    console.log('se elimina usuario');
  }).catch(reason => {
    handThisShit(reason);
  });
});


exports.whenCreatingUser = functions.firestore.document('dashboard/petitions/newPass/{id}').onCreate(
  (snapshot: any) => {
    const petitionData = snapshot.data();
    if (petitionData.type === 'NEW_USER') {
      const data = {
        'TemplateAlias': 'abc123',
        'TemplateModel': {
          'user_name': petitionData.name + ' ' + petitionData.lastname,
          'action_url': 'https://moena-1989.firebaseapp.com/'
        },
        'From': 'no-reply@moena1989.com',
        'To': 'anfgc01@gmail.com'
      };
      mailerClient.sendEmailWithTemplate(data).catch((err: any) => {
        handThisShit(err);
      }).then((value: any) => {
        console.log('FUNCA');
      }).catch((value: any) => {
        console.log('EL OTRO');
      });
    }
  });

function handThisShit(err: any) {
  console.log('se handea');
  console.log(err);
}
