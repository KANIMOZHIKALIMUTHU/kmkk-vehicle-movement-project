import React, { useEffect, useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [selectedOption, setSelectedOption] = useState('today');
  const [mapType] = useState('roadmap');
  const [connectionType, setConnectionType] = useState('wireless');
  const [isMinimized, setIsMinimized] = useState(false);
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(25); // Playback speed in milliseconds
  const [animationInterval, setAnimationInterval] = useState(null);

  const getPath = (option) => {
    const paths = {
      today: [
        { lat: 37.7749, lng: -122.4194 },
        { lat: 37.7780, lng: -122.4150 },
        { lat: 37.7799, lng: -122.4100 },
      ],
      yesterday: [
        { lat: 37.7740, lng: -122.4190 },
        { lat: 37.7770, lng: -122.4140 },
        { lat: 37.7790, lng: -122.4090 },
      ],
      this_week: [
        { lat: 37.7749, lng: -122.4194 },
        { lat: 37.7700, lng: -122.4300 },
        { lat: 37.7800, lng: -122.4200 },
      ],
      previous_week: [
        { lat: 37.7600, lng: -122.4300 },
        { lat: 37.7650, lng: -122.4400 },
        { lat: 37.7700, lng: -122.4500 },
      ],
      this_month: [
        { lat: 37.7700, lng: -122.4200 },
        { lat: 37.7600, lng: -122.4300 },
        { lat: 37.7500, lng: -122.4400 },
      ],
      previous_month: [
        { lat: 37.7500, lng: -122.4500 },
        { lat: 37.7400, lng: -122.4600 },
        { lat: 37.7300, lng: -122.4700 },
      ],
      custom: [
        // Use a default or empty path for custom until a range is specified
      ],
    };
    return paths[option];
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDr63qkhdIUs0eTN1d3fVCRvRmNk7ruOaI&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      initMap();
    };
    document.head.appendChild(script);

    function initMap() {
      const mapOptions = {
        zoom: 14,
        center: { lat: 37.7749, lng: -122.4194 },
        mapTypeId: mapType,
      };

      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      const selectedPath = getPath(selectedOption);

      const pathPolyline = new window.google.maps.Polyline({
        path: selectedPath,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      pathPolyline.setMap(map);

      const startMarker = new window.google.maps.Marker({
        position: selectedPath[0],
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'red',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });

      startMarker.setMap(map)

      const endMarker = new window.google.maps.Marker({
        position: selectedPath[selectedPath.length - 1],
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: 'green',
          fillOpacity: 1,
          strokeColor: 'white',
          strokeWeight: 2,
        },
      });

      endMarker.setMap(map)

      const carMarker = new window.google.maps.Marker({
        position: selectedPath[0],
        map: map,
        icon: {
          url: 'vehicle-icon.png', // URL to your car icon image
          scaledSize: new window.google.maps.Size(20, 20),
        },
      });

      function moveCar() {
        let step = 0;
        const numSteps = 200;

        function moveMarker() {
          if (!isPlaying) return;

          step += 1;
          if (step >= numSteps) {
            step = 0;
          }

          const startIndex = Math.floor(step / numSteps * (selectedPath.length - 1));
          const endIndex = Math.ceil(step / numSteps * (selectedPath.length - 1));
          const nextPosition = window.google.maps.geometry.spherical.interpolate(
            selectedPath[startIndex],
            selectedPath[endIndex],
            (step % (numSteps / (selectedPath.length - 1))) / (numSteps / (selectedPath.length - 1))
          );

          carMarker.setPosition(nextPosition);

          if (step < numSteps) {
            setAnimationInterval(setTimeout(moveMarker, playbackSpeed));
          } else {
            clearInterval(animationInterval);
            setAnimationInterval(null);
          }
        }

        moveMarker();
      }

      moveCar();
    }

    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [selectedOption, mapType, isPlaying, playbackSpeed, customRange, animationInterval]
);

  return (
    <div className="app-container">
      <div id="map"></div>
      <div className={`configure-box ${isMinimized ? 'minimized' : ''}`}>
        <div className="configure-box-header">
          <h3>Configure</h3>
          <div>
            <button className="minimize-btn" onClick={() => setIsMinimized(!isMinimized)}>–</button>
            <button className="close-btn" onClick={() => console.log('Close')}>×</button>
          </div>
        </div>
        <div className={`configure-box-content ${isMinimized ? 'hidden' : ''}`}>
          <label>
            Connection Type:
            <select value={connectionType} onChange={(e) => setConnectionType(e.target.value)}>
              <option value="wireless">Wireless</option>
              <option value="wired">Wired</option>
            </select>
          </label>
          <label>
            Time Period:
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="previous_week">Previous Week</option>
              <option value="this_month">This Month</option>
              <option value="previous_month">Previous Month</option>
              <option value="custom">Custom</option>
            </select>
          </label>
          {selectedOption === 'custom' && (
            <div>
              <label>
                Start Date:
                <input type="date" value={customRange.start} onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })} />
              </label>
              <label>
                End Date:
                <input type="date" value={customRange.end} onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })} />
              </label>
            </div>
          )}
          <button onClick={() => setSelectedOption(selectedOption)}>
            Show
          </button>
          <div className="player-controls">
            <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <label>
              Playback Speed:
              <input
                type="number"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                min="1"
                step="1"
                className="speed-input"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
