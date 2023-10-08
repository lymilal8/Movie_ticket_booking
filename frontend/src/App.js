import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Addemployee from './components/Addemployee';
import Footer from './components/Footer';
import Addmovie from './components/Addmovie';
import ViewallMovies from './components/ViewallMovies';
import Register from './components/Register';
import Home from './components/Home';
import MovieSchedule from './components/MovieSchedule';
import Review from './components/Review';
import MovieBooking from './components/MovieBooking';
import Addmovies from './components/Addmovies';
import Myaccount from './components/Myaccount';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/review"  element={<Review/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route path="/addmovies"  element={<Main child={<Addmovies/>}/>}/>
      <Route path="/addmovie" element={<Main child={<Addmovie method="post" data={{movie_name:"",img_url:'',category:"",languages:"",cast:"",description:"",ticket_rate:"",no_seats:""}}/>}/>}/>
      <Route path="/movies" element={<Main child={<ViewallMovies/>}/>}/>
      <Route path="/booking" element={<Main child={<MovieBooking/>}/>}/>
      <Route path="/myaccount" element={<Main child={<Myaccount/>}/>}/>
      <Route path="/booking/:movieId" element={<Main child={<MovieBooking/>}/>}/>
      <Route path="/footer"  element={<Footer/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
