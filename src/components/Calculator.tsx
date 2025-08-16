"use client";
import React, { useState } from 'react';
import './Calculator.css';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
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
        <h5 className="card-title text-center">{t('calculator')}</h5>
        <div className="display form-control mb-2">
          <div className="input">{input || 0}</div>
          <div className="result">{result}</div>
        </div>
        
        <div className="calculator-grid">
            {/* Top Row */}
            <button onClick={() => handleButtonClick('AC')} className="btn-clear">AC</button>
            <button onClick={() => handleButtonClick('√')} className="btn-function">√</button>
            <button onClick={() => handleButtonClick('x²')} className="btn-function">x²</button>
            
            {/* Numpad */}
            <button onClick={() => handleButtonClick('7')} className="btn-number">7</button>
            <button onClick={() => handleButtonClick('8')} className="btn-number">8</button>
            <button onClick={() => handleButtonClick('9')} className="btn-number">9</button>
            <button onClick={() => handleButtonClick('4')} className="btn-number">4</button>
            <button onClick={() => handleButtonClick('5')} className="btn-number">5</button>
            <button onClick={() => handleButtonClick('6')} className="btn-number">6</button>
            <button onClick={() => handleButtonClick('1')} className="btn-number">1</button>
            <button onClick={() => handleButtonClick('2')} className="btn-number">2</button>
            <button onClick={() => handleButtonClick('3')} className="btn-number">3</button>
            <button onClick={() => handleButtonClick('0')} className="btn-number zero">0</button>
            <button onClick={() => handleButtonClick('.')} className="btn-number">.</button>

            {/* Side Column */}
            <button onClick={() => handleButtonClick('÷')} className="btn-operator">÷</button>
            <button onClick={() => handleButtonClick('x')} className="btn-operator">x</button>
            <button onClick={() => handleButtonClick('-')} className="btn-operator">-</button>
            <button onClick={() => handleButtonClick('+')} className="btn-operator">+</button>
            <button onClick={() => handleButtonClick('=')} className="btn-operator equals">=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;