import './App-mobile.css';
// import './App.css';
import Home from './components/Home/Home';
import HomeEdit from './components/Home/HomeEdit';
import Menu from './components/Menu/Menu';
import About from './components/About/About';
import AboutEdit from './components/About/AboutEdit';
import Project from './components/Project/Project';
import ProjectEdit from './components/Project/ProjectEdit';
import ProjectDetail from './components/Project/ProjectDetail';
import ProjectNew from './components/Project/ProjectNew';
import Auth from './components/Auth';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import { Navigate, BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [routeLog, setRouteLog] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() =>{
    const getLogin = () => {
      const routeName = "Login-"+Math.floor(Math.random() * 1000 + 1)
      setRouteLog(routeName)
    }
    getLogin()

    const userPeriode = localStorage.getItem("user");
    userPeriode && JSON.parse(userPeriode) ? setUser(true) : setUser(false);
  },[])

  useEffect(() => {
    localStorage.setItem("user", user)    
  }, [user])

  return (
    <div className="App">
      <Router>
      <Menu />
        { user &&
          <Sidebar authentication={() => setUser(false)} />
        }
        <Routes>
          {/* public route */}
          {!user && (
            <>
              <Route path="/" element={ <Home /> } />
              <Route path="/project" element={ <Project /> } />
              <Route path="/about" element={ <About /> } />
              <Route path='/project/:slug' element={ <ProjectDetail /> } />
              <Route path={"/"+routeLog} element={ <Auth authentication={() => setUser(true)} /> } />
            </>
          )}
          
          {/* private route */}
          {user && (
            <>
              <Route path="/" element={ <Home /> } />
              <Route path="/project" element={ <Project user={user} /> } />
              <Route path="/about" element={ <About /> } />
              <Route path='/project/:slug' element={ <ProjectDetail   /> } />
              <Route path={"/"+routeLog} element={ <Auth authentication={() => setUser(true)} /> } />
              <Route path='/homeedit' element={ <HomeEdit /> } />
              <Route path='/aboutedit' element={ <AboutEdit  user={user} /> } />
              <Route path='/project/add' element={ <ProjectNew /> } />
              <Route path='/project/edit/:slug' element={ <ProjectEdit /> } />  
            </>
          )}

          <Route path='*' element={ <Navigate to={user ? '/homeedit' : '/'} /> } />  
        </Routes>
      <Footer pathRoute={routeLog} />
      </Router>
    </div>
  );
}

export default App;
