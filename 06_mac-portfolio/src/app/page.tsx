import Dock from "./components/Dock"
import Navigation from "./components/Navigation"


const page = () => {
  return (
    <main
      style={{ backgroundImage: 'url("./mac-wallpaper.jpg")' }}
      className="w-screen h-screen bg-center bg-conver bg-no-repeat"
    >
      <Navigation />
      <Dock />
    </main>
  )
}

export default page
