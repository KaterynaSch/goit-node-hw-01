import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async() =>  {
    const results = await fs.readFile(contactsPath);
    return JSON.parse(results);    
}
  
export const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
}
export const addContact = async(data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}  

export const removeContact = async(id) =>  {
    const contacts = await listContacts();
    const i = contacts.findIndex(item => item.id === id);
    if(i === -1){
        return null;
    }
    const [result] = contacts.splice(i, 1)
    await updateContacts(contacts);
    return result    
}  

