import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import MapGL, { Source, Layer } from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

const MainContainer = styled.div`
width: 100vw;
height: 100vh;
`
const BujeonGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: '부전동' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[129.0594, 35.1572], [129.0605, 35.1572], [129.0605, 35.1585], [129.0594, 35.1585], [129.0594, 35.1572]]]
      }
    }
  ]
};

export default function App() {
  const [geoData, setGeoData] = useState(null);
  const [color, setColor] = useState([255, 0, 0, 100]); // 초기 색상 (빨간색)

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(prev => (prev[0] === 255 ? [0, 255, 0, 100] : [255, 0, 0, 100])); // 빨강 ↔ 초록 번갈아 변경
    }, 1000); // 1초마다 색 변경

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 부전동 GeoJSON 데이터를 불러오기
    fetch('/bujeon.geojson')
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error('GeoJSON 데이터를 불러올 수 없습니다.', error));
  }, []);


  return (
    <MainContainer>
    <DeckGL
      initialViewState={{
        latitude: 35.1575,
        longitude: 129.0599,
        zoom: 10
      }}
      controller={true}
      // layers={[
      //   new GeoJsonLayer({
      //     id: 'blinking-region',
      //     data: BujeonGeoJSON,
      //     stroked: true,
      //     filled: true,
      //     getFillColor: color,
      //     getLineColor: [255, 255, 255, 200]
      //   })
      // ]}
      layers={
        geoData
          ? [
              new GeoJsonLayer({
                id: 'bujeon-district',
                data: geoData,
                stroked: true,
                filled: true,
                getFillColor: color, // 영역 색상
                getLineColor: [255, 255, 255, 200], // 테두리 색상
                lineWidthMinPixels: 2
              })
            ]
          : []
      }
    >
      <MapGL
        style={{ width: '100%', height: '500px' }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </DeckGL>
    </MainContainer>
    
  );
}
