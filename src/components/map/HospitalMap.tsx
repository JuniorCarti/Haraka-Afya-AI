import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { MapPin, Phone, Filter, Hospital, Pill, Building, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Hospital {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'pharmacy' | 'dispensary';
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  services: string[];
  is_sha_accredited: boolean;
  is_public: boolean;
  has_emergency: boolean;
}

interface HospitalMapProps {
  mapboxToken?: string;
}

const HospitalMap: React.FC<HospitalMapProps> = ({ mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    shaAccredited: false,
    publicOnly: false,
    emergencyOnly: false
  });
  const [inputToken, setInputToken] = useState('');
  const [useInputToken, setUseInputToken] = useState(!mapboxToken);

  const currentMapboxToken = useInputToken ? inputToken : mapboxToken;

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Nairobi
          setUserLocation({ lat: -1.2921, lng: 36.8219 });
        }
      );
    } else {
      // Default to Nairobi
      setUserLocation({ lat: -1.2921, lng: 36.8219 });
    }
  }, []);

  // Fetch hospitals from Supabase
  useEffect(() => {
    const fetchHospitals = async () => {
      const { data, error } = await supabase
        .from('hospitals')
        .select('*');

      if (error) {
        console.error('Error fetching hospitals:', error);
        return;
      }

      setHospitals(data as Hospital[] || []);
      setFilteredHospitals(data as Hospital[] || []);
    };

    fetchHospitals();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...hospitals];

    if (filters.type !== 'all') {
      filtered = filtered.filter(h => h.type === filters.type);
    }
    if (filters.shaAccredited) {
      filtered = filtered.filter(h => h.is_sha_accredited);
    }
    if (filters.publicOnly) {
      filtered = filtered.filter(h => h.is_public);
    }
    if (filters.emergencyOnly) {
      filtered = filtered.filter(h => h.has_emergency);
    }

    setFilteredHospitals(filtered);
  }, [hospitals, filters]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !userLocation || !currentMapboxToken) return;

    mapboxgl.accessToken = currentMapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [userLocation.lng, userLocation.lat],
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location marker
    new mapboxgl.Marker({ color: '#16a34a' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup().setHTML('<p>Your Location</p>'))
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [userLocation, currentMapboxToken]);

  // Add hospital markers
  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.hospital-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add markers for filtered hospitals
    filteredHospitals.forEach((hospital) => {
      const el = document.createElement('div');
      el.className = 'hospital-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      
      // Color code by type
      const colors = {
        hospital: '#dc2626',
        clinic: '#2563eb',
        pharmacy: '#16a34a',
        dispensary: '#ca8a04'
      };
      el.style.backgroundColor = colors[hospital.type];

      // Add icon
      const icon = document.createElement('div');
      icon.style.color = 'white';
      icon.style.fontSize = '16px';
      icon.innerHTML = hospital.type === 'hospital' ? '🏥' : 
                     hospital.type === 'clinic' ? '🏥' :
                     hospital.type === 'pharmacy' ? '💊' : '🏪';
      el.appendChild(icon);

      // Create popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-semibold text-sm mb-1">${hospital.name}</h3>
          <p class="text-xs text-gray-600 mb-2">${hospital.type}</p>
          <p class="text-xs mb-2">${hospital.address}</p>
          <button 
            class="bg-primary text-white px-2 py-1 rounded text-xs mr-1 view-details-btn"
            data-hospital-id="${hospital.id}"
          >
            View Details
          </button>
          ${hospital.phone ? `<a href="tel:${hospital.phone}" class="bg-green-600 text-white px-2 py-1 rounded text-xs">Call</a>` : ''}
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([hospital.longitude, hospital.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      // Handle view details button click
      popup.on('open', () => {
        const viewBtn = document.querySelector(`[data-hospital-id="${hospital.id}"]`);
        if (viewBtn) {
          viewBtn.addEventListener('click', () => {
            setSelectedHospital(hospital);
          });
        }
      });
    });
  }, [filteredHospitals]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hospital': return <Hospital className="w-4 h-4" />;
      case 'clinic': return <Building className="w-4 h-4" />;
      case 'pharmacy': return <Pill className="w-4 h-4" />;
      case 'dispensary': return <Stethoscope className="w-4 h-4" />;
      default: return <Hospital className="w-4 h-4" />;
    }
  };

  if (useInputToken && !inputToken) {
    return (
      <div className="p-6 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
          <p className="text-gray-600 mb-4">
            Please enter your Mapbox public token to display the map with hospital locations.
          </p>
          <Input
            type="text"
            placeholder="Enter your Mapbox public token"
            value={inputToken}
            onChange={(e) => setInputToken(e.target.value)}
            className="mb-4"
          />
          <p className="text-sm text-gray-500">
            Get your token from{' '}
            <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              mapbox.com
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Filter Facilities</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hospital">Hospitals</SelectItem>
              <SelectItem value="clinic">Clinics</SelectItem>
              <SelectItem value="pharmacy">Pharmacies</SelectItem>
              <SelectItem value="dispensary">Dispensaries</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.shaAccredited}
                onChange={(e) => setFilters(prev => ({ ...prev, shaAccredited: e.target.checked }))}
                className="rounded"
              />
              <span>SHA Accredited</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.publicOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, publicOnly: e.target.checked }))}
                className="rounded"
              />
              <span>Public Only</span>
            </label>
            
            <label className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                checked={filters.emergencyOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, emergencyOnly: e.target.checked }))}
                className="rounded"
              />
              <span>Emergency Ready</span>
            </label>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative">
        <div ref={mapContainer} className="w-full h-96 rounded-xl overflow-hidden shadow-sm" />
        
        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white p-3 rounded-lg shadow-sm">
          <h4 className="font-semibold text-sm mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Hospitals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Clinics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Pharmacies</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
              <span>Dispensaries</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hospital Details Modal */}
      {selectedHospital && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  {getTypeIcon(selectedHospital.type)}
                  <span>{selectedHospital.name}</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedHospital(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {selectedHospital.address}
                </p>
                {selectedHospital.phone && (
                  <p className="text-sm text-gray-600">
                    <Phone className="w-4 h-4 inline mr-1" />
                    {selectedHospital.phone}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant={selectedHospital.is_public ? 'default' : 'secondary'}>
                  {selectedHospital.is_public ? 'Public' : 'Private'}
                </Badge>
                {selectedHospital.is_sha_accredited && (
                  <Badge variant="outline">SHA Accredited</Badge>
                )}
                {selectedHospital.has_emergency && (
                  <Badge variant="destructive">Emergency</Badge>
                )}
              </div>

              {selectedHospital.services.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedHospital.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {selectedHospital.phone && (
                  <Button asChild className="flex-1">
                    <a href={`tel:${selectedHospital.phone}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </a>
                  </Button>
                )}
                <Button variant="outline" className="flex-1" onClick={() => {
                  const url = `https://maps.google.com/?q=${selectedHospital.latitude},${selectedHospital.longitude}`;
                  window.open(url, '_blank');
                }}>
                  <MapPin className="w-4 h-4 mr-2" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hospital List */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold mb-4">Nearby Facilities ({filteredHospitals.length})</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedHospital(hospital)}
            >
              <div className="flex items-center space-x-3">
                {getTypeIcon(hospital.type)}
                <div>
                  <h4 className="font-medium text-sm">{hospital.name}</h4>
                  <p className="text-xs text-gray-600">{hospital.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {hospital.has_emergency && (
                  <Badge variant="destructive" className="text-xs">Emergency</Badge>
                )}
                {hospital.is_sha_accredited && (
                  <Badge variant="outline" className="text-xs">SHA</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalMap;