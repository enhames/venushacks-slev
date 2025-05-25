// import React, { useState, useEffect } from 'react';
// import PartnerHome from './PartnerHome';
// import PeriodHaverHome from './PeriodHaverHome';

// export default function Home() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Grab from localStorage (or fetch `/me` later from backend)
//     const stored = localStorage.getItem('user');
//     if (stored) {
//       setUser(JSON.parse(stored));
//     }
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return user.role === 'partner' ? <PartnerHome /> : <PeriodHaverHome />;
// }

import React, { useState, useEffect } from 'react';
import PartnerHome from './PartnerHome';
import PeriodHaverHome from './PeriodHaverHome';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TEMP: hardcode role here to test
    setUser({ role: 'period-haver' }); // or 'period-haver'
  }, []);

  if (!user) return <p>Loading...</p>;

  return user.role === 'partner' ? <PartnerHome /> : <PeriodHaverHome />;
}

