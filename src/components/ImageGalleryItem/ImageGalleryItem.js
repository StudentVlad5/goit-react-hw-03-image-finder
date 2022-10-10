const  ImageGalleryItem = ({liItem, startModalWindow}) => {
  if ([Object.values({liItem})[0]][0] === undefined){return console.log('Пусто')}
  if([Object.values({liItem})[0]][0].length>0){
 let step1 = ([Object.values({liItem})[0]][0]);
   let liElems = step1.map(key=> 
  <li key={key.id} className="ImageGalleryItem">
  <img className="ImageGalleryItem-image" src={key.webformatURL} alt={key.tags} data-source={key.largeImageURL} onClick={(e)=>startModalWindow(e)}/>
  </li>);
  return (
liElems
)}}


export default ImageGalleryItem