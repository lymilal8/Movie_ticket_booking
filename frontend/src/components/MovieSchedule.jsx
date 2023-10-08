import React from 'react'

const MovieSchedule = () => {
  return (
    <div>
        <div className="page">
          <div className="row">
            <div className="col-md-9">
              <div className="slider">
                <ul className="slides">
                  {[1].map((index) => (
                    <li key={index}>
                      <a href="#"><img src={`dummy/slide-${index}.jpg`} alt={`Slide ${index}`} /></a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div className="row">
                {[1, 2].map((index) => (
                  <div key={index} className="col-sm-6 col-md-12">
                    <div className="latest-movie">
                      <a href="#"><img src={`dummy/thumb-${index}.jpg`} alt={`Movie ${index}`} /></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row">
            {[3, 4, 5, 6].map((index) => (
              <div key={index} className="col-sm-6 col-md-3">
                <div className="latest-movie">
                  <a href="#"><img src={`dummy/thumb-${index}.jpg`} alt={`Movie ${index}`} /></a>
                </div>
              </div>
            ))}
          </div>

         
        </div>
    </div>
  )
}

export default MovieSchedule