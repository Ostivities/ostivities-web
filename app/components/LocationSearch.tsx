import React, { useState, useEffect } from 'react';
import { Input, List, Spin, message } from 'antd';

// Utility to load Google Maps API dynamically
const loadGoogleMapsApi = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve(window.google);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places,geocoding`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve(window.google);
    };

    script.onerror = (error) => {
      reject(error);
    };

    document.head.appendChild(script);
  });
};

interface LocationSearchProps {
  onSelectLocation: (address: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [googleLoaded, setGoogleLoaded] = useState(false); // Track if Google Maps API is loaded
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [mapSrc, setMapSrc] = useState<string>(''); // State to store the iframe URL

  // Load Google Maps API when the component mounts
  useEffect(() => {
    loadGoogleMapsApi()
      .then(() => {
        setGoogleLoaded(true); // Set as loaded when the script is ready
      })
      .catch(() => {
        message.error('Failed to load Google Maps API.');
      });
  }, []);

  // Fetch the places predictions based on the search term
  useEffect(() => {
    if (!googleLoaded) return; // Don't try to fetch predictions if Google API isn't loaded

    const autocompleteService = new google.maps.places.AutocompleteService();

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setLoading(true);

        autocompleteService.getPlacePredictions(
          { input: searchTerm },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              const results = predictions?.map((prediction) => prediction.description);
              setLocations(results || []);
            } else {
              message.error('Failed to fetch locations.');
            }
            setLoading(false);
          }
        );
      } else {
        setLocations([]);
      }
    }, 1000); // Debounce for 1 second to prevent too many API requests

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, googleLoaded]); // Run the effect when the search term or googleLoaded state changes

  // Handle selecting a location and geocoding it
  const handleSelect = (address: string) => {
  setSelectedAddress(address);
  onSelectLocation(address);

  // Use the Geocoding API to get the latitude and longitude of the selected address
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
      const { lat, lng } = results[0].geometry.location;
      // Construct the iframe src URL with the latitude and longitude
      setMapSrc(
        `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7465438415493!2d${lng()}!3d${lat()}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf5402368b913%3A0xca22600eeec46d00!2s${encodeURIComponent(address)}!5e0!3m2!1sen!2sus!4v1730907605084!5m2!1sen!2sus`
      );
    } else {
      message.error('Failed to geocode the address.');
    }
  });
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
          renderItem={(item) => (
            <List.Item onClick={() => handleSelect(item)} style={{ cursor: 'pointer' }}>
              {item}
            </List.Item>
          )}
        />
      )}

      {selectedAddress && (
        <div style={{ marginTop: "20px" }}>
         <h3 style={{ color: '#e20000' }}>Selected Location: {selectedAddress}</h3>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
