import React, { useRef, useState } from 'react'
import { Button, QRCode } from 'antd'
import ModalForm from './Modal'

const App = () => {
  const divRef =useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [QRCOde, setQrCode] = useState({})
   const downloadQr =()=>{
    // console.log(divRef.current)
    const canvas = divRef.current.querySelector("canvas")
    const base64String = canvas.toDataURL('image/png')
     const a = document.createElement('a')
     a.href= base64String;
     a.download ="qr-code.png"
     a.click();
     a.remove()
   }
  
  return (
    <div className='bg-gray-200 h-screen py-12 flex flex-col items-center justify-between space-y-5'>
      {showModal && <ModalForm  setQrCode={setQrCode} showModal={showModal} setShowModal={setShowModal}/>}
        <h1 className="text-4xl font-bold"> Generator - Qr Code </h1>
       <div 
  ref={divRef} 
  className="rounded-2xl p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 
             shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col items-center"
>
  <div className="bg-white p-4 rounded-xl shadow-md">
    <QRCode
      icon={QRCOde.icon ? QRCOde.icon : "https://avatars.githubusercontent.com/u/181944095?v=4"}
      bgColor={QRCOde.bgColor ? QRCOde.bgColor : "black"}
      color={QRCOde.color ? QRCOde.color : "white"} // slate-800
      value={QRCOde.url ? QRCOde.url : "https://github.com/Adit122022"}
      size={220}
      bordered={false}
    />
  </div>
  <p className="mt-4 text-white font-semibold text-lg tracking-wide">
    Scan me 🚀
  </p>
</div>

        {/* Button For Download */}
        <div className="flex w-1/2 justify-between">
          <Button onClick={()=>setShowModal(!showModal)} size='large'  className='bg-primary'>Generate now</Button>
        <Button onClick={downloadQr} size='large' type='primary' className='bg-primary'>Download now</Button>
        </div>
    </div>
  )
}

export default App