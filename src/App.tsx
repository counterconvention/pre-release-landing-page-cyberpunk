/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MatrixDigitalRain } from './components/MatrixDigitalRain';
import { CyberCitySkyline } from './components/CyberCitySkyline';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-matte-cyber select-none">
      {/* 100% Transparent Hacker Matrix Digital Rain in Cyberpunk RED with fluid ripple interference */}
      <MatrixDigitalRain />

      {/* Cyberpunk City Skyline silhouette on the floor - proportionate and crisp on all screens including QHD */}
      <CyberCitySkyline />
    </div>
  );
}
