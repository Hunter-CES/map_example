import * as React from 'react';
import MapGL from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import styled from 'styled-components';

const MainContainer = styled.div`
width: 100vw;
height: 100vh;
`
function App() {
  return (
    <MainContainer>
      <MapGL
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: 3
      }}
      
      // mapStyle="https://api.maptiler.com/maps/streets/style.json?key=get_your_own_key"
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
    />
    </MainContainer>
    
  );
}
export default App;