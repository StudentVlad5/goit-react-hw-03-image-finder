import {FaRegWindowClose} from 'react-icons/fa'
const  Modal = ({largeImage, closeModalWindow, handleKeyDown}) => { 
   return (
    <div className='Overlay' onClick={closeModalWindow} onKeyDown={handleKeyDown} tabIndex={0}>
      <div className='Modal' onClick={(e)=>e.stopPropagation()} style={{backgroundImage:`url(${largeImage.src})`}}> 
         <button className="button" type="button" onClick={(e)=>closeModalWindow(e)}><FaRegWindowClose style={{width:30, height: 30, fill: "blue"}}/></button>
         {/* <img className= 'imgModal' src = {largeImage.src} alt={largeImage.alt} /> */}
      </div>
   </div>
 )       
}
export default Modal