"use client";

"use client";

import React, { useState } from 'react';
import './Calculator.css';

// A more robust and safe evaluation function than eval()
const safeEval = (expression: string) => {
    try {
        // Basic validation to prevent malicious code injection
        if (/[^0-9+\-*/().\s√]/.test(expression.replace(/x/g, '*').replace(/÷/g, '/'))) {
            return 'Error';
        }
        // Handle square root
        expression = expression.replace(/√(\d+\.?\d*)/g, 'Math.sqrt($1)');
        
        // eslint-disable-next-line no-new-func
        return new Function('return ' + expression.replace(/x/g, '*').replace(/÷/g, '/'))();
    } catch (e) {
        return 'Error';
    }
};

const Calculator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      const evalResult = safeEval(input);
      setResult(evalResult.toString());
    } else if (value === 'AC') {
      setInput('');
      setResult('');
    } else if (value === 'C') {
        setInput(input.slice(0, -1));
    } else if (value === 'x²') {
        const evalResult = safeEval(input);
        setResult(Math.pow(evalResult, 2).toString());
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="calculator card">
      <div className="card-body">
        <h5 className="card-title text-center">Calculator</h5>
        <div className="display form-control mb-2">
          <div className="input">{input || 0}</div>
          <div className="result">{result}</div>
        </div>
        
        <div className="calculator-grid">
            {/* Top Row */}
            <button onClick={() => handleButtonClick('AC')} className="btn btn-danger">AC</button>
            <button onClick={() => handleButtonClick('√')} className="btn btn-warning">√</button>
            <button onClick={() => handleButtonClick('x²')} className="btn btn-warning">x²</button>
            
            {/* Numpad */}
            <button onClick={() => handleButtonClick('7')} className="btn btn-light">7</button>
            <button onClick={() => handleButtonClick('8')} className="btn btn-light">8</button>
            <button onClick={() => handleButtonClick('9')} className="btn btn-light">9</button>
            <button onClick={() => handleButtonClick('4')} className="btn btn-light">4</button>
            <button onClick={() => handleButtonClick('5')} className="btn btn-light">5</button>
            <button onClick={() => handleButtonClick('6')} className="btn btn-light">6</button>
            <button onClick={() => handleButtonClick('1')} className="btn btn-light">1</button>
            <button onClick={() => handleButtonClick('2')} className="btn btn-light">2</button>
            <button onClick={() => handleButtonClick('3')} className="btn btn-light">3</button>
            <button onClick={() => handleButtonClick('0')} className="btn btn-light zero">0</button>
            <button onClick={() => handleButtonClick('.')} className="btn btn-light">.</button>

            {/* Side Column */}
            <button onClick={() => handleButtonClick('÷')} className="btn btn-warning">÷</button>
            <button onClick={() => handleButtonClick('x')} className="btn btn-warning">x</button>
            <button onClick={() => handleButtonClick('-')} className="btn btn-warning">-</button>
            <button onClick={() => handleButtonClick('+')} className="btn btn-warning">+</button>
            <button onClick={() => handleButtonClick('=')} className="btn btn-danger equals">=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
