import React from 'react'
import Header from './Header'
import Footer from './Footer';

const Main = (props) => {
  console.log(props);
  return (
    <div>
      <div id="site-content">
        <Header />
        <main className="main-content">
        {props.child}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Main