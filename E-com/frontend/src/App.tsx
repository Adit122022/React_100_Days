import Admin from "./components/Admin/AdminLogin"
import Login from "./components/auth/Login";
import Squares from './components/ui/Squares';

const App = () => {
  return (
    <div className="overflow-x-hidden max-w-screen relative">
      <div className="w-screen h-screen">
        <Squares
          speed={0.5}
          squareSize={20}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#313647'
          hoverFillColor='#AAC4F5'
        />
      </div>
      <div className="absolute top-0  w-screen h-screen">

        {/* <Admin /> */}
        <Login />
      </div>
    </div>
  )
}

export default App
