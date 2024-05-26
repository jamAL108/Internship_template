"use client"
import React, { useState, useEffect } from 'react';

    interface Bench {
      value: string;
      text: string;
    }
    
    interface HighCourtData {
      highCourt: string;
      benches: Bench[];
    }
    
    // Assuming HCdropdownsData is the correctly imported data as shown above
    import HCdropdownsData from './HCdropdowns.json';
    
    const highCourtData: HighCourtData[] = HCdropdownsData as HighCourtData[];
    
    const YourComponent: React.FC = () => {
      const [highCourts, setHighCourts] = useState<string[]>([]);
      const [selectedHighCourt, setSelectedHighCourt] = useState<string>('');
      const [benches, setBenches] = useState<Bench[]>([]);
    
      // Load high courts from HCdropdowns.json
      useEffect(() => {
        const highCourtNames = highCourtData.map(item => item.highCourt);
        setHighCourts(highCourtNames);
      }, []);
    
      // Update benches when a high court is selected
      useEffect(() => {
        if (selectedHighCourt) {
          const selectedHighCourtData = highCourtData.find(item => item.highCourt === selectedHighCourt);
          if (selectedHighCourtData && selectedHighCourtData.benches) {
            setBenches(selectedHighCourtData.benches);
          } else {
            setBenches([]);
          }
        }
      }, [selectedHighCourt]);
    
      return (
        <div>
          <select onChange={e => setSelectedHighCourt(e.target.value)} value={selectedHighCourt}>
            <option value="">Select High Court</option>
            {highCourts.map((court, index) => (
              <option key={index} value={court}>{court}</option>
            ))}
          </select>
    
          {selectedHighCourt && (
            <select>
              <option value="">Select Bench</option>
              {benches.map((bench, index) => (
                <option key={index} value={bench.value}>{bench.text}</option>
              ))}
            </select>
          )}
        </div>
      );
    }
    
  
export default YourComponent