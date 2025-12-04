import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [stats, setStats] = useState({
    hp: 0, attack: 0, defense: 0,
    sp_atk: 0, sp_def: 0, speed: 0
  });
  
  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setStats({ ...stats, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ariflaskml-dff5g9c7bdhyhsc5.brazilsouth-01.azurewebsites.net/predict', stats);
      setResultado(response.data);
    } catch (error) {
      console.error("Erro", error);
    }
  };

  return (
    <div className="pokedex-container">
      <div className="pokedex-header">
        <h1>Detector de Lendários</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="stats-grid">
        {Object.keys(stats).map((key) => (
          <div key={key} className="stat-input">
            <label>{key.toUpperCase()}</label>
            <input 
              type="number" 
              name={key} 
              value={stats[key]} 
              onChange={handleChange} 
              required 
            />
          </div>
        ))}
        <button type="submit" className="scan-btn">ANALISAR POKÉMON</button>
      </form>

      {resultado && (
        <div className={`result-box ${resultado.is_legendary ? 'legendary' : 'common'}`}>
          <h2>Resultado: {resultado.resultado}</h2>
          <p>{resultado.is_legendary ? 'Este Pokémon é extremamente raro e poderoso!' : 'Apenas um Pokémon selvagem comum.'}</p>
        </div>
      )}
    </div>
  );
}

export default App;