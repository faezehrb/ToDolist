'use client'

import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div>
      {username ? <h1>Welcome, {username}!</h1> : <p>Loading...</p>}
    </div>
  );
};

export default ProfilePage;