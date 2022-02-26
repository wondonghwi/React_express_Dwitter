// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
  {
    id: '1',
    username: 'bob',
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
];

export const findByUsername = async username => {
  return users.find(user => user.username === username);
};

export const findById = async id => {
  return users.find(user => user.id === id);
};

export const createUser = async user => {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
};
