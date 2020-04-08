const fs = require('fs');
const crypto = require('crypto');

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

  async create(attributes) {

    attributes.id = this.randomId();

    const records = await this.getAll();
    records.push(attributes);

    await this.writeAll(records);


  }

  async writeAll(records) {
    //write it back to users.json / this.filename
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2))
  }

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {

    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id) {

    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);

    await this.writeAll(filteredRecords);
  }

  async update(id, attributes) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} does not exist`)
    }

    Object.assign(record, attributes);

    await this.writeAll(records);


  }

  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      if (found) {
        return record;
      }


    }
  }

}

module.exports = new UsersRepository('users.json');

