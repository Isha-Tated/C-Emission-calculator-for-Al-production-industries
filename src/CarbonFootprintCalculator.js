import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const CarbonFootprintCalculator = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const [travelMode, setTravelMode] = useState('');
  const [electricitySource, setElectricitySource] = useState('');
  const [foodType, setFoodType] = useState('');

  const [carbonEmission, setCarbonEmission] = useState(0);
  const [suggestion, setSuggestion] = useState('');

  const [travelCarbon, setTravelCarbon] = useState(0);
  const [electricityCarbon, setElectricityCarbon] = useState(0);
  const [foodCarbon, setFoodCarbon] = useState(0);

  const toggleDropdown1 = () => setIsOpen1(!isOpen1);
  const toggleDropdown2 = () => setIsOpen2(!isOpen2);
  const toggleDropdown3 = () => setIsOpen3(!isOpen3);

  const handleSubmit = () => {
    let travelCarbon = 0;
    let electricityCarbon = 0;
    let foodCarbon = 0;
    let suggestionText = '';

    if (travelMode === 'Coal') {
      travelCarbon = 7.0;
      suggestionText += 'Coal-based energy is the most carbon-intensive. Consider shifting to renewable sources like solar or wind. ';
    } else if (travelMode === 'Solar') {
      travelCarbon = 1.75;
      suggestionText += 'Solar energy is an excellent choice for reducing carbon footprint. ';
    } else if (travelMode === 'Wind') {
      travelCarbon = 1.75;
      suggestionText += 'Wind energy is clean and sustainable. Great job! ';
    } else if (travelMode === 'Hydro') {
      travelCarbon = 2.5;
      suggestionText += 'Hydropower is cleaner than fossil fuels, but consider its ecological impacts. ';
    } else if (travelMode === 'Natural') {
      travelCarbon = 4;
      suggestionText += 'Natural gas is better than coal, but still emits CO₂. Transitioning to renewables is recommended. ';
    }

    if (electricitySource === 'Carbon') {
      electricityCarbon = 1.5;
      suggestionText += 'Carbon anodes contribute significantly to emissions. Try switching to hydrogen or ceramic-based alternatives. ';
    } else if (electricitySource === 'Hydrogen') {
      electricityCarbon = 0.001;
      suggestionText += 'Hydrogen anodes are highly sustainable. Keep it up! ';
    } else if (electricitySource === 'Metal') {
      electricityCarbon = 0.02;
      suggestionText += 'Metallic anodes are moderately eco-friendly. Consider hydrogen or ceramic for best results. ';
    } else if (electricitySource === 'Ceramic') {
      electricityCarbon = 0.01;
      suggestionText += 'Ceramic-based anodes are clean and sustainable. Good choice! ';
    }

    if (foodType === 'Graphite') {
      foodCarbon = 0.3;
      suggestionText += 'Graphite coatings are functional but high in emission. Try switching to Boron or Silicon-based options. ';
    } else if (foodType === 'Zinc') {
      foodCarbon = 0.175;
      suggestionText += 'Zinc stearate is better than graphite but has room for improvement. ';
    } else if (foodType === 'Aluminium') {
      foodCarbon = 0.05;
      suggestionText += 'Aluminium stearate coatings are a relatively green option. ';
    } else if (foodType === 'Magnesium') {
      foodCarbon = 0.175;
      suggestionText += 'Magnesium coatings are moderate in emissions. Consider Boron-based alternatives for lower impact. ';
    } else if (foodType === 'Boron') {
      foodCarbon = 0.01;
      suggestionText += 'Boron nitride is a great low-emission coating. Excellent pick! ';
    } else if (foodType === 'Silicon') {
      foodCarbon = 0.01;
      suggestionText += 'Silicon coatings are very eco-friendly. Great choice! ';
    } else if (foodType === 'Calcium') {
      foodCarbon = 0.14;
      suggestionText += 'Calcium coatings are decent, but Boron or Silicon would lower your impact further. ';
    }

    const totalEmission = ((travelCarbon + electricityCarbon + foodCarbon) / 8.8) * 100;
    setCarbonEmission(totalEmission);
    setSuggestion(suggestionText);
    setTravelCarbon(travelCarbon);
    setElectricityCarbon(electricityCarbon);
    setFoodCarbon(foodCarbon);
  };

  const chartData = [
    { name: 'Fuel', value: travelCarbon ? ((travelCarbon / 8.8) * 100) : 0 },
    { name: 'Anode', value: electricityCarbon ? ((electricityCarbon / 8.8) * 100) : 0 },
    { name: 'Coating', value: foodCarbon ? ((foodCarbon / 8.8) * 100) : 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)',
      backgroundSize: '200% 200%',
      animation: 'gradientShift 5s ease infinite',
      minHeight: '100vh',
      color: 'white',
      padding: '20px',
      position: 'relative'
    }}>
      <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white' }}>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
          <li><a href="#home" style={{ color: 'white', textDecoration: 'none' }}>Home</a></li>
        </ul>
      </nav>

      <div style={{ marginTop: '30px', padding: '20px', color: '#7D0A0A' }}>
        <h2>Carbon Footprint Calculator</h2>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={toggleDropdown1} style={{ backgroundColor: '#97866A', border: '1px solid #ccc', padding: '10px', width: '400px', textAlign: 'left', color: 'white' }}>
            FUELS {isOpen1 ? '▲' : '▼'}
          </button>
          {isOpen1 && (
            <div style={{ padding: '10px', marginTop: '5px' }}>
              <label>
                Select Fuel:
                <select onChange={(e) => setTravelMode(e.target.value)} style={{ backgroundColor: '#99BC85' }}>
                  <option value="">--Select--</option>
                  <option value="Coal">Coal Based Power</option>
                  <option value="Solar">Solar Power</option>
                  <option value="Wind">Wind Power</option>
                  <option value="Hydro">Hydro Power</option>
                  <option value="Natural">Natural Gas Power</option>
                </select>
              </label>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={toggleDropdown2} style={{ backgroundColor: '#97866A', border: '1px solid #ccc', padding: '10px', width: '400px', textAlign: 'left', color: 'white' }}>
            ANODES {isOpen2 ? '▲' : '▼'}
          </button>
          {isOpen2 && (
            <div style={{ padding: '10px', marginTop: '5px' }}>
              <label>
                Select Anode:
                <select onChange={(e) => setElectricitySource(e.target.value)} style={{ backgroundColor: '#99BC85' }}>
                  <option value="">--Select--</option>
                  <option value="Carbon">Carbon Anode</option>
                  <option value="Hydrogen">Hydrogen Anode</option>
                  <option value="Metal">Metallic Based - Ni-Fe-Co</option>
                  <option value="Ceramic">Ceramic Based - SnO2</option>
                </select>
              </label>
            </div>
          )}
        </div>

        <div style={{ marginBottom: '20px' }}>
          <button onClick={toggleDropdown3} style={{ backgroundColor: '#97866A', border: '1px solid #ccc', padding: '10px', width: '400px', textAlign: 'left', color: 'white' }}>
            COATINGS {isOpen3 ? '▲' : '▼'}
          </button>
          {isOpen3 && (
            <div style={{ padding: '10px', marginTop: '5px' }}>
              <label>
                Select Coating:
                <select onChange={(e) => setFoodType(e.target.value)} style={{ backgroundColor: '#99BC85' }}>
                  <option value="">--Select--</option>
                  <option value="Graphite">Graphite Coating</option>
                  <option value="Zinc">Zinc Stearate Coating</option>
                  <option value="Aluminium">Aluminium Stearate Coating</option>
                  <option value="Magnesium">Magnesium Based Coating</option>
                  <option value="Boron">Boron Nitride Coating</option>
                  <option value="Silicon">Silicon Based Coating</option>
                  <option value="Calcium">Calcium Based Coating</option>
                </select>
              </label>
            </div>
          )}
        </div>

        <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#522546', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>

        {carbonEmission > 0 && (
          <div style={{ marginTop: '20px', fontSize: '18px' }}>
            <h3>Total Carbon Emission: {carbonEmission.toFixed(2)}% CO2 emission</h3>
            <p style={{ marginTop: '10px', color: '#333', backgroundColor: '#E4EFE7', padding: '10px', borderRadius: '8px' }}>
              <strong>Suggestion:</strong> {suggestion}
            </p>
          </div>
        )}

        {carbonEmission > 0 && (
          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '10px', color: '#333' }}>Emission Breakdown</h3>
            <PieChart width={400} height={300}>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;

