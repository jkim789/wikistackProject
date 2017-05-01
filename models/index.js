var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5433/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urltitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
    // defaultValue: 'open'
    // allowNull: true
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
},
{
  getterMethods: {
    route: function(){
      return '/wiki/'+ this.urltitle
    }
  },
  hooks: {
    beforeValidate: function generateUrlTitle (page) {
      var title = page.title;
      if (title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        // return title.replace(/\s+/g, '_').replace(/\W/g, '');
        console.log(title)

        page.urltitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
      // return Math.random().toString(36).substring(2, 7);
        page.urltitle = Math.random().toString(36).substring(2, 7);
      }
      // var something =
    }
  }
})


var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = {
  db: db,
  Page: Page,
  User: User
}
