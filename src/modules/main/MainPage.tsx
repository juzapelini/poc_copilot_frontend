import React, { useEffect, useState } from 'react';

const MainPage = () => {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {fullName}!</h1>
      {/* Rest of your MainPage content */}
    </div>
  );
};

export default MainPage;