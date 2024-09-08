import React from 'react';
import { User } from '../services/api';

interface UserDropdownProps {
  users: User[];
  onSelectUser: (userId: number) => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, onSelectUser }) => (
  <select
    className="block w-64 p-2 border border-gray-300 rounded-md"
    onChange={(e) => onSelectUser(Number(e.target.value))}
  >
    <option value="">Select a user</option>
    {users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    ))}
  </select>
);

export default UserDropdown;