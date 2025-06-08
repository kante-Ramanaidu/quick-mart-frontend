import React, { useEffect, useState } from 'react';

const ProfilePage = ({ emailOrPhone }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!emailOrPhone) return;

    fetch(`http://localhost:5000/api/user?email_or_phone=${encodeURIComponent(emailOrPhone)}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user data');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [emailOrPhone]);

  if (loading) return <div>Loading user profile...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <p><strong>Full Name:</strong> {user.full_name}</p>
      <p><strong>Email or Phone:</strong> {user.email_or_phone}</p>
    </div>
  );
};

export default ProfilePage;
