import React from 'react'
// import logo from './Images/logo.png' 

const Dashboard = () => {
  return (
    <>
        <div className="dashboard-container">
            <div className="navbar-container">
                <div className="app-logo">
                    <img src='#' alt="app logo" />
                </div>
                <div className="user-profile">
                    <a href="#"><img src="#" alt="profile image" /></a>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="basic-info">
                    <div className="profile">
                        <div className="profile-img">
                            <img src="#" alt="profile image" />
                        </div>
                        <div className="identity">
                            <h3 className='Name'>Kamal Kishor</h3>
                            <h4 className="username">kamalkish0r</h4>
                        </div>
                    </div>

                    <div className="expense-info">
                        <p>Your balance is ₹1000</p>
                    </div>

                    <div className="create-new-group">
                        <button className='btn'>Create New Group</button>
                    </div>
                </div>
                <div className="groups">

                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard