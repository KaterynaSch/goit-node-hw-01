import * as contactService from './contacts.js';
import { program } from 'commander';

program
    .option('-a, --action <type>')
    .option('-i, --id <type>')
    .option('-n, --name <type>')
    .option('-e, --email <type>')
    .option('-p, --phone <type>')
    
program.parse();
const options = program.opts();
invokeAction(options);

const invokeAction = async({ action, id, ...data }) => {
  switch (action) {
    case 'list':
        const allContacts = await contactService.listContacts();
        return console.table(allContacts);      
    case 'get':
        const oneContact = await contactService.getContactById(id);
        return console.log(oneContact);
    case 'add':
        const addedContact = await contactService.addContact(data);
        return console.log(addedContact);
    case 'remove':
        const deletedContact = await contactService.removeContact(id);
        return console.log(deletedContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

