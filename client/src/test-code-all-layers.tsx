// Test code to trigger all 7 layers of the NeuroLint engine
// This code contains issues that each layer can detect and fix

// Layer 1: Configuration Modernization Issues
// - Missing TypeScript strict mode
// - Outdated React imports
// - Missing Next.js configuration

// Layer 2: Content Standardization Issues  
// - var instead of const/let
// - console.log statements
// - HTML entities
// - Inconsistent quotes

// Layer 3: Component Intelligence Issues
// - Missing TypeScript interfaces
// - Missing accessibility attributes
// - Missing key props
// - Missing error boundaries

// Layer 4: SSR/Hydration Safety Issues
// - localStorage without SSR guards
// - Missing 'use client' directive
// - Hydration mismatches

// Layer 5: Next.js App Router Issues
// - Old router imports
// - Missing metadata exports
// - Pages router patterns

// Layer 6: Testing & Validation Issues
// - Missing test files
// - No input validation
// - No error handling

// Layer 7: Adaptive Pattern Learning Issues
// - Custom patterns that can be optimized
// - Team convention violations

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Missing TypeScript interface
function UserProfile({ userId, name, email }) {
  var [user, setUser] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  
  const router = useRouter();

  useEffect(() => {
    // Layer 4: localStorage without SSR guards
    const theme = localStorage.getItem('theme') || 'light';
    document.body.className = theme;
    
    // Layer 2: console.log statement
    console.log('Loading user profile for:', userId);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load user:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  // Layer 3: Missing accessibility attributes
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="user-profile">
      <h1>{user?.name || 'Unknown User'}</h1>
      <p>{user?.email || 'No email'}</p>
      
      {/* Layer 3: Missing key props */}
      {user?.posts?.map(post => (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      
      {/* Layer 3: Missing accessibility attributes */}
      <button onClick={() => router.push('/edit')}>
        Edit Profile
      </button>
      
      {/* Layer 2: HTML entities */}
      <p>User&apos;s favorite color is &quot;blue&quot;</p>
      
      {/* Layer 4: Hydration mismatch potential */}
      <div>
        Current time: {new Date().toLocaleTimeString()}
      </div>
      
      {/* Layer 6: No input validation */}
      <input 
        type="text" 
        placeholder="Enter name"
        onChange={(e) => setUser({...user, name: e.target.value})}
      />
      
      {/* Layer 7: Custom pattern that can be optimized */}
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

// Layer 5: Old router import and Pages router pattern
export default function ProfilePage() {
  const router = useRouter();
  const { userId } = router.query;
  
  // Layer 6: No error handling for missing userId
  if (!userId) {
    return <div>No user ID provided</div>;
  }
  
  return (
    <div>
      <UserProfile userId={userId} />
    </div>
  );
}

// Layer 1: Missing TypeScript configuration
// Layer 6: Missing test file
// Layer 7: Team convention violations (inconsistent naming) 