// import React, { useState, useEffect } from 'react';
// import { Input, List, Spin, message } from 'antd';
// import axios from 'axios';

// interface LocationSearchProps {
//   onSelectLocation: (address: string) => void;
// }

// const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectLocation }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [locations, setLocations] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);
//   const API_KEY = "pk.78628ea993a1c84c0c71a9563edddb7f"


//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         setLoading(true);
//         axios
//           .get(' https://api.locationiq.com/v1/autocomplete', {
//             params: {
//               q: searchTerm,
//               format: 'json',
//               addressdetails: 1,
//               key: API_KEY,
//             },
//             headers: {
//               'User-Agent': 'Ostivities/1.0 (ostivities@gmail.com)', // Add your app name and contact information
//             },
//           })
//           .then(response => {
//             const results = response.data.map((result: any) => result.display_name);
//             console.log(results)
//             setLocations(results);
//             setLoading(false);
//           })
//           .catch(error => {
//             console.error('Nominatim API error:', error);
//             message.error('Failed to fetch locations.');
//             setLoading(false);
//           });
//       } else {
//         setLocations([]);
//       }
//     }, 1000); // Delay to adhere to the rate limit

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm]);

//   const handleSelect = (address: string) => {
//     onSelectLocation(address);
//   };

//   return (
//     <div>
//       <Input.Search
//         placeholder="Search for a location"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginBottom: 8 }}
//       />
//       {loading ? (
//         <div style={{ textAlign: 'center' }}><Spin /></div>
//       ) : (
//         <List
//           dataSource={locations}
//           renderItem={item => (
//             <List.Item onClick={() => handleSelect(item)} style={{ cursor: 'pointer' }}>
//               {item}
//             </List.Item>
//           )}
//         />
//       )}
//     </div>
//   );
// };

// export default LocationSearch;



import React, { useState, useEffect } from 'react';
import { Input, List, Spin, message } from 'antd';
import axios from 'axios';

interface LocationSearchProps {
  onSelectLocation: (address: string) => void;
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);
        
        axios
          .get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
              input: searchTerm,
              key: GOOGLE_API_KEY,
              language: 'en',  // Specify the language for results
            },
          })
          .then((response) => {
            if (response.data.status === 'OK') {
              const results = response.data.predictions.map((prediction: any) => prediction.description);
              console.log(results);
              setLocations(results);
            } else {
              message.error('Failed to fetch locations.');
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Google Places API error:', error);
            message.error('Failed to fetch locations.');
            setLoading(false);
          });
      } else {
        setLocations([]);
      }
    }, 1000); // Debounce for 1 second to prevent too many API requests

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSelect = (address: string) => {
    onSelectLocation(address);
  };

  return (
    <div>
      <Input.Search
        placeholder="Search for a location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      {loading ? (
        <div style={{ textAlign: 'center' }}><Spin /></div>
      ) : (
        <List
          dataSource={locations}
          renderItem={item => (
            <List.Item onClick={() => handleSelect(item)} style={{ cursor: 'pointer' }}>
              {item}
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default LocationSearch;
