// src/components/HomeCard.tsx
import React, { useState } from 'react';
import EditUserModal from './EditUserModal';
import { Home } from '../services/api';

interface HomeCardProps {
  home: Home;
}

const HomeCard: React.FC<HomeCardProps> = ({ home }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold">{home.street_address}</h2>
      <p>State: {home.state}</p>
      <p>Zip: {home.zip}</p>
      <p>Sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>
      <p>List Price: ${home.list_price}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Edit User
      </button>
      {isModalOpen && (
        <EditUserModal home={home} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default HomeCard;