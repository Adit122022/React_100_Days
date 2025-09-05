import { Badge } from 'antd'

const NavBar = ({timer}) => {
  
   
  return (
    <nav className="bg-white h-[60px] fixed top-0 left-0 w-full shadow-md z-10">
        
    <div className='flex w-full h-full px-5 items-center justify-between'>
        <h1 className='font-serif font-bold text-2xl text-gray-800'>Plan<span className='text-gray-500'>ner</span></h1>
        <Badge >{timer}</Badge>
    </div>
   </nav>
  )
}

export default NavBar