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
      //if not, create a file
      fs.writeFileSync(this.filename, '[]');
    }

  }

  async getAll() {
    //Open the file called this.filename Read its contents Parse the contents Return the parsed data
    return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));


  }



}

const test = async () => {

  const repo = new UsersRepository('users.json');
  await repo.getAll();
}

test()

