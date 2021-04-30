import React from 'react'

const Map = ({ lines }) => {
  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)" />
        {
          lines.map(({ x1, y1, x2, y2 }) => (
            <g key={[x1, y1, x2, y2].join(":")}>
              <circle className="source" cx={x1} cy={y1}>
                <title></title>
              </circle>
              <circle className="destination" cx={x1} cy={y1}>
                <title></title>
              </circle>
              <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
            </g>
          ))
        }
      </g>
    </svg>
  )
}

export default Map