import React from 'react'

const UserInfo = () => {
  return (
    <div>
      <h1>User Information</h1>
      <div className='container'>
        <div className='left'>
            <h3>Current information</h3>
            <p>Your most recent weight: XX   kg</p>
            <p>Your current BMI is    : XX      </p>
            <p>A rest you will burn approximately: XX calories per day</p>
        </div>
        <div className='right'></div>
        </div>  

    </div>
  )
}

export default UserInfo
