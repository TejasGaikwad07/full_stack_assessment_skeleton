import React, { useState, useEffect } from 'react';
import { useGetUsersByHomeQuery, useUpdateUsersForHomeMutation } from '../services/api';
import { Home, User } from '../services/api';

interface EditUserModalProps {
  home: Home;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ home, onClose }) => {
  const { data: users, isLoading, isError } = useGetUsersByHomeQuery(home.id);
  const [updateUsers] = useUpdateUsersForHomeMutation();
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  useEffect(() => {
    if (users) {
      setSelectedUserIds(users.map(user => user.id));
    }
  }, [users]);

  const handleSave = async () => {
    if (selectedUserIds.length === 0) {
      alert('At least one user must be selected');
      return;
    }
    await updateUsers({ homeId: home.id, userIds: selectedUserIds });
    onClose();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Users for {home.street_address}</h2>
        {users?.map((user) => (
          <label key={user.id} className="block mb-2">
            <input
              type="checkbox"
              checked={selectedUserIds.includes(user.id)}
              onChange={() => {
                setSelectedUserIds((prev) =>
                  prev.includes(user.id)
                    ? prev.filter((id) => id !== user.id)
                    : [...prev, user.id]
                );
              }}
            />
            {user.username}
          </label>
        ))}
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
            disabled={selectedUserIds.length === 0}
          >
            Save
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;