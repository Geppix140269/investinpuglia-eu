// lib/locations.ts
// USE THESE FREE APIs INSTEAD OF STORING THOUSANDS OF LOCATIONS!

// Option 1: REST Countries API (FREE - All countries & cities)
export async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  return countries.map((country: any) => ({
    code: country.cca2,
    name: country.name.common,
    flag: country.flag
  })).sort((a: any, b: any) => a.name.localeCompare(b.name));
}

// Option 2: GeoNames API (FREE with registration - 30,000 credits/day)
// Register at: http://www.geonames.org/export/web-services.html
const GEONAMES_USERNAME = 'demo'; // Register for free and replace with your username

export async function getCities(countryCode: string) {
  const response = await fetch(
    `http://api.geonames.org/searchJSON?country=${countryCode}&featureClass=P&maxRows=1000&username=${GEONAMES_USERNAME}`
  );
  const data = await response.json();
  return data.geonames.map((city: any) => ({
    name: city.name,
    province: city.adminName1,
    lat: city.lat,
    lng: city.lng
  }));
}

// Option 3: Italian-specific API for comuni/provinces
export async function getItalianProvinces() {
  try {
    // Use the official Italian dataset
    const response = await fetch('https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json');
    const data = await response.json();
    
    // Extract unique provinces - FIXED VERSION
    const provinceMap = new Map();
    
    data.forEach((comune: any) => {
      if (!provinceMap.has(comune.sigla)) {
        provinceMap.set(comune.sigla, {
          code: comune.sigla,
          name: comune.provincia.nome
        });
      }
    });
    
    // Convert Map values to array and sort
    return Array.from(provinceMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error('Error fetching Italian provinces:', error);
    // Return fallback Puglia provinces if API fails
    return [
      { code: 'BA', name: 'Bari' },
      { code: 'BT', name: 'Barletta-Andria-Trani' },
      { code: 'BR', name: 'Brindisi' },
      { code: 'FG', name: 'Foggia' },
      { code: 'LE', name: 'Lecce' },
      { code: 'TA', name: 'Taranto' }
    ];
  }
}

// Option 4: Google Places Autocomplete (Best UX but needs API key)
// Use in your component:
/*
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

const autocomplete = new google.maps.places.Autocomplete(inputElement, {
  types: ['(cities)'],
  componentRestrictions: { country: 'it' }
});
*/

// Option 5: Use a React component library
// npm install react-select react-select-country-list
/*
import Select from 'react-select';
import countryList from 'react-select-country-list';

const options = countryList().getData();
<Select options={options} />
*/
