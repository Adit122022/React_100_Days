import 'remixicon/fonts/remixicon.css'
import 'animate.css'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { data } from './data'

const App = () => {
  const [src, setSrc] = useState(null)
  const [option, setOption] = useState("male")

  const generateNumForPerson = () => {
    const r = Math.floor(Math.random() * 99) + 1
    return r
  }

  const generate = () => {
    const obj = data.find((item) => item.value === option)
    const url = obj.url
    if (option === "male" || option === "female") {
      const imageUrl = `${url}/${generateNumForPerson()}.jpg`
      setSrc(imageUrl)
    } else {
      const uniqueValue = Date.now()
      const imageUrl = `${url}${uniqueValue}`
      setSrc(imageUrl)
    }
  }

  const download = (url) => {
    const a = document.createElement("a")
    a.href = url
    a.download = `${Date.now()}.jpg`
    a.click()
    a.remove()
  }

  const copy = (url) => {
    navigator.clipboard.writeText(url)
    toast.success("Image url copied", { position: "top-center" })
  }

  useEffect(() => {
    generate()
  }, [option])

  return (
    <div className='animate__animated animate__fadeIn overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white px-4'>
      <div className='animate__animated animate__slideInUp animate__faster gap-6 flex flex-col items-center w-full sm:max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 p-6 sm:p-8 md:p-10'>
        
        {/* Avatar Image */}
        <div className='bg-white rounded-full'>
          <img 
            src={src || "/avt.jpg"}
            className='w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full shadow-lg object-cover'  
          />
        </div>

        {/* Title + Subtitle */}
        <div className='text-center'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide'>Avatar Generator</h1>
          <p className='text-slate-300 text-sm sm:text-base md:text-lg'>Generate unlimited avatars for your website</p>
        </div>

        {/* Dropdown + URL Box */}
        <div className='w-full space-y-4'>
          <select className='bg-slate-900/60 w-full p-3 rounded-xl text-sm sm:text-base' value={option} onChange={(e) => setOption(e.target.value)}>
            {data.map((item, index) => <option value={item.value} key={index}>{item.label}</option>)}
          </select>
          
          <div className='bg-slate-900/60 w-full p-3 rounded-xl text-xs sm:text-sm break-all'>
            {src}
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row w-full gap-3 sm:gap-4'>
          <button onClick={generate} className='flex-1 bg-gradient-to-r from-rose-500 to-orange-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform text-sm sm:text-base'>
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>

          <button onClick={() => download(src)} className='flex-1 bg-gradient-to-r from-green-500 to-cyan-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform text-sm sm:text-base'>
            <i className="ri-download-line mr-1"></i>
            Download
          </button>

          <button onClick={() => copy(src)} className='flex-1 bg-gradient-to-r from-orange-500 to-amber-600 font-medium rounded-lg py-2 hover:scale-105 transition-transform text-sm sm:text-base'>
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
