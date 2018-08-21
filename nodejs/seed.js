import DB from './server/config/databse';
import Role from './server/models/role';
import RoleData from './server/seeds/role.json';

import AdminData from './server/seeds/admin.json';
import Admin from './server/models/admin';
DB.connect();
//const seedDB = async function() {
RoleData.forEach(element => {
  Role.findOne({ name: element.name }, function(err, result) {
    if (err) {
      throw err;
    } else {
      if (result == null && !result) {
        Role.create(element, function(err, res) {
          console.log('Role successfully insert');
        });
      } else {
        console.log('Role already added..', element.name);
      }
    }
  });
});

AdminData.forEach(element => {
  Admin.findOne({ email: element.email }, function(err, result) {
    if (err) {
      throw err;
    } else {
      if (result == null && !result) {
        Admin.create(element, function(err, res) {
          console.log('Admin successfully insert');
        });
      } else {
        console.log('Admin already available..', element.email);
      }
    }
  });
});

//module.exports = seedDB;
