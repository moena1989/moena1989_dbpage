const postmark = require('postmark');
const postmarkKey = functions.config().postmark.key;
const mailerClient = new postmark.ServerClient(postmarkKey);

exports.removeUserFunc = (snapshot: any, context: any) => {
  const d = snapshot.data();
  admin.auth().deleteUser(d.uid).then((value: any) => {
    console.log('user ' + d.uid + ' deleted ;) ');
  });
};

exports.whenCreatingUser = (snapshot: any) => {
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

    mailerClient.sendEmailWithTemplate(data).then((value: any) => {
      console.log('FUNCA');
    });
  }
};
