import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async () => {
    try {
  
      const parsedData = JSON.parse(jsonInput);
      if (!parsedData || !parsedData.data) {
        throw new Error('Invalid JSON format');
      }

     
      const res = await axios.post('http://localhost:5000/bfhl', parsedData);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError(err.message || 'Invalid JSON input');
      setResponse(null);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        <h3>Response:</h3>
        <ul>
          {selectedOptions.includes('alphabets') && <li>Alphabets: {response.alphabets.join(', ')}</li>}
          {selectedOptions.includes('numbers') && <li>Numbers: {response.numbers.join(', ')}</li>}
          {selectedOptions.includes('highest_lowercase_alphabet') && (
            <li>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</li>
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE10193</h1> 
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here...'
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={(selected) => setSelectedOptions(selected.map(option => option.value))}
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;
