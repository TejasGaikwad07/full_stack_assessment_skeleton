import React, { useState, useEffect } from 'react';
import { useGetUsersQuery, useGetHomesByUserQuery } from '../services/api';
import UserDropdown from './UserDropdown';
import HomeCard from './HomeCard';
import LoadingSpinner from './LoadingSpinner';

const HomesForUserPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: users, isLoading: isLoadingUsers, error: usersError } = useGetUsersQuery();
  const { data: homesData, isLoading: isLoadingHomes, error: homesError } = useGetHomesByUserQuery(
    { userId: selectedUserId!, page: currentPage },
    { skip: !selectedUserId }
  );

  const homes = homesData?.homes || [];
  const totalPages = homesData?.totalPages || 0;

  useEffect(() => {
    console.log('Selected User ID:', selectedUserId);
    console.log('Current Page:', currentPage);
    console.log('Homes Data:', homesData);
  }, [selectedUserId, currentPage, homesData]);

  if (isLoadingUsers) return <LoadingSpinner />;
  if (usersError) return <div>Error loading users: {(usersError as any).message}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-4">
        <UserDropdown users={users || []} onSelectUser={setSelectedUserId} />
      </div>
      {isLoadingHomes ? (
        <LoadingSpinner />
      ) : homesError ? (
        <div>Error loading homes: {(homesError as any).message}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {homes.map(home => (
              <HomeCard key={home.id} home={home} />
            ))}
          </div>
          {homes.length === 0 && <div>No homes found for this user.</div>}
          <div className="mt-4 flex justify-center">
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomesForUserPage;