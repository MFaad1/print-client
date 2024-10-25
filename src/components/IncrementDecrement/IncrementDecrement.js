import React, { useState } from 'react';

const IncrementDecrement = ({count,setCount}) => {

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleDecrement}>-</button>
      <span style={styles.count}>{count}</span>
      <button style={styles.button} onClick={handleIncrement}>+</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '30px',
    height: '30px',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    margin: '0 10px',
    fontSize: '18px',
  },
};

export default IncrementDecrement;
