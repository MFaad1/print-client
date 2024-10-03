import React from 'react'
import '../../components/Loader/loader.css'

function Loader() {
  return (
<div class="loader-container">
  <div class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>

  )
}

export default Loader