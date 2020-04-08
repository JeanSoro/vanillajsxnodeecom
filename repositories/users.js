const fs = require('fs');

class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Filename required to create repository');
    }

    this.filename = filename;
    try {
      //check if file exists
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }


  }

  async checkForFile() {

  }


}

const repo = new UsersRepository('users.json');