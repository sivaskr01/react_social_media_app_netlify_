import React from 'react'

const Footer = () => {
  const day=new Date();
  return (
    <footer className='Footer'>
    <p>Copyright &copy;{day.getFullYear()}</p>
    </footer>
  )
}

export default Footer