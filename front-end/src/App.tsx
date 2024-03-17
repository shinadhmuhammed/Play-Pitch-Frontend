
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import UserRoutes from './Routes/Routes'

function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path='*' element={<UserRoutes/>}></Route>
      </Routes>
     </Router>
    </>
  )
}

export default App
