import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import Profile from "../profile/Profile";

const Home = () => {
  
  return (
    <div className="Home">
      <Profile/>
      <PostSide/>
      <RightSide/>
    </div>
  )
}

export default Home;