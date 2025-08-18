import React, { useState } from 'react';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === '=') {
      try {
        setResult(eval(input).toString()); // Using eval for simplicity, not recommended for production
      } catch (error) {
        setResult('Error');
      }
    } else if (value === '√') {
      try {
        setInput(Math.sqrt(parseFloat(input)).toString());
        setResult('');
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'x²') {
      try {
        setInput(Math.pow(parseFloat(input), 2).toString());
        setResult('');
      } catch (error) {
        setResult('Error');
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '30px', // Rounded buttons
    fontSize: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.2s'
  };

  const numberButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e0e0e0', // Light gray for numbers
  };

  const functionButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#f0f0f0', // Slightly different shade for functions
  };

  const operatorButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff9500', // Orange for operators
    color: 'white',
  };

  return (
    <div style={{
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>计算器</h2>
      <div style={{
        backgroundColor: '#f5f5f5', // Light gray background for calculator
        borderRadius: '10px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '10px',
          textAlign: 'right',
          fontSize: '2em',
          minHeight: '1.5em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          wordBreak: 'break-all'
        }}>
          <div style={{ fontSize: '0.6em', color: '#888' }}>{input}</div>
          <div>{result || '0'}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <button style={functionButtonStyle} onClick={() => handleButtonClick('AC')}>AC</button>
          <button style={functionButtonStyle} onClick={() => handleButtonClick('√')}>√</button>
          <button style={functionButtonStyle} onClick={() => handleButtonClick('x²')}>x²</button>
          <button style={operatorButtonStyle} onClick={() => handleButtonClick('/')}>÷</button>

          <button style={numberButtonStyle} onClick={() => handleButtonClick('7')}>7</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('8')}>8</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('9')}>9</button>
          <button style={operatorButtonStyle} onClick={() => handleButtonClick('*')}>×</button>

          <button style={numberButtonStyle} onClick={() => handleButtonClick('4')}>4</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('5')}>5</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('6')}>6</button>
          <button style={operatorButtonStyle} onClick={() => handleButtonClick('-')}>-</button>

          <button style={numberButtonStyle} onClick={() => handleButtonClick('1')}>1</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('2')}>2</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('3')}>3</button>
          <button style={operatorButtonStyle} onClick={() => handleButtonClick('+')}>+</button>

          <button style={{ ...numberButtonStyle, gridColumn: 'span 2' }} onClick={() => handleButtonClick('0')}>0</button>
          <button style={numberButtonStyle} onClick={() => handleButtonClick('.')}>.</button>
          <button style={operatorButtonStyle} onClick={() => handleButtonClick('=')}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;