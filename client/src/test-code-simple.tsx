// Simple test code to trigger all 7 layers
// Copy and paste this into the demo section

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function UserProfile({ userId, name, email }) {
  var [user, setUser] = useState(null);
  var [loading, setLoading] = useState(true);
  
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
    
    console.log('Loading user profile for:', userId);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load user:', err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h1>{user?.name || 'Unknown User'}</h1>
      <p>{user?.email || 'No email'}</p>
      
      {user?.posts?.map(post => (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      
      <button onClick={() => router.push('/edit')}>
        Edit Profile
      </button>
      
      <p>User&apos;s favorite color is &quot;blue&quot;</p>
      
      <div>
        Current time: {new Date().toLocaleTimeString()}
      </div>
      
      <input 
        type="text" 
        placeholder="Enter name"
        onChange={(e) => setUser({...user, name: e.target.value})}
      />
      
      <div className="user-stats">
        {user?.stats?.map((stat, index) => (
          <div key={index} className="stat-item">
            <span className="stat-label">{stat.label}</span>
            <span className="stat-value">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  
  if (!userId) {
    return <div>No user ID provided</div>;
  }
  
  return (
    <div>
      <UserProfile userId={userId} />
    </div>
  );
} 