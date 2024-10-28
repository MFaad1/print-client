import React from 'react';
import '../../components/Loader/loader.css';
import { BarLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="loader-container">
      <BarLoader 
        color="#f7801a"       
        loading={true}        
        height={4}           
        width={100}     
        aria-label="Loading Spinner"
        data-testid="loader"
        className='loader-loading-margin'
      />
    </div>
  );
}

export default Loader;
