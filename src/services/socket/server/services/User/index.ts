export interface IUser {
  id: string;
  name: string;
  room: string;
}

const users: IUser[] = [];

const addUser = ({
  id,
  name,
  room,
}: {
  id: string;
  name: string;
  room: string;
}): IUser => {
  let user = users.find(({ id: i }: IUser) => i === id);
  if (!findUser) {
    user = { id, name, room };
    users.push(user);
  }
  return { ...user };
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const findUser = (id: string) =>
  users.find(({ id: userId }: IUser) => userId === id);

const usersInRoom = (room: string) =>
  users.filter((user) => user.room === room);

export default { addUser, removeUser, findUser, usersInRoom };
