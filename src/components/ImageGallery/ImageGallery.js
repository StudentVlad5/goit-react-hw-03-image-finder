import {Component} from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import ImageGalleryError from './ImageGalleryError';
import ImageGalleryPending from './ImageGalleryPending';
import Loader from '../Loader/Loader';
import Modal from 'components/Modal/Modal';


class ImageGallery extends Component {
    state = {
        images: '',
        error: null,
        imageCount: 1,
        status: 'idle',
        totalImg: 0,
        statusMore: 'idle',
        visibility: false,
        scroll: false
       }

async componentDidUpdate(prevProps, prevState){
if(prevProps.imgSearchName !== this.props.imgSearchName)
{   this.setState({status:'pending'});
    await fetch(`https://pixabay.com/api/?q=${this.props.imgSearchName}&page=1&key=29531534-c6f4c4079f81828b6fd250707&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res=>{if(res.ok){return res.json()}
    return Promise.reject(new Error(`Can't find anything with ${this.props.imgSearchName}`))})
    .then(images => 
        this.setState({
        images : images.hits, 
        status:'resolved', 
        totalImg: images.total,
        largeImage: ''
    }))
    .catch(error=>this.setState({error, status:'reject'}))
}

if(prevState.imageCount !== this.state.imageCount){
    this.setState({statusMore:'pendingMore'});
    await fetch(`https://pixabay.com/api/?q=${this.props.imgSearchName}&page=${this.state.imageCount}&key=29531534-c6f4c4079f81828b6fd250707&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res=>{if(res.ok){return res.json()}
    return Promise.reject(new Error(`Can't find anything with ${this.props.imgSearchName}`))})
    .then(images => {
    this.setState({images: this.state.images.concat(images.hits), status:'resolved', statusMore: 'idle'})})
    .catch(error=>this.setState({error, status:'reject'}))
}

if (this.state.scroll){
    this.windowScroll()}
}

windowScroll = () => {
    window.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
      })}

handleImageCount = ()=> {  
    this.setState({imageCount: this.state.imageCount + 1, scroll: true});
   }


checkCountImg = () => { let countOfImg =  this.state.totalImg - this.state.imageCount * 12;
    return countOfImg
}

startModalWindow = (e) => {
const addLsnEsc = document.addEventListener('keydown', this.handleKeyDown)
this.setState({visibility: true, largeImage : e.target, scroll: false});
return addLsnEsc
}

closeModalWindow = (e) =>{
document.removeEventListener('keydown',this.addLsnEsc)
this.setState({visibility: false, scroll: false})
}

handleKeyDown = (e) => {
    if (e.key === "Escape"){ 
    document.removeEventListener('keydown',this.addLsnEsc)
    this.setState({visibility: false, scroll: false})}
  };


    render() {
        let imgForSearch = this.state.images;
        const {status, error, statusMore, visibility,totalImg} = this.state;
        const handleImageCount = this.handleImageCount;
        const countOfImg = this.checkCountImg();
        const startModalWindow = this.startModalWindow;
         
        if(status === 'idle'){ return(
            <div className='SearchMessage'>Очікуємо на запит</div>
        )}

        if(status === 'reject'){return(
            <ImageGalleryError message={error.message}/>
        )}

        if(status === 'resolved'){ return (
        <div>
            {totalImg === 0 && <h1>Упс, не знайшли такі фото. Спробуйте змінити дані пошуку</h1>}
            <ul className="ImageGallery">
            <ImageGalleryItem liItem={imgForSearch} startModalWindow={startModalWindow}/>
            </ul>
            {countOfImg > 0 && statusMore !== 'pendingMore' && <Loader handleimageCount={handleImageCount}/>}
            {statusMore === 'pendingMore' && <ImageGalleryPending/>}
            {visibility && <Modal largeImage={this.state.largeImage} closeModalWindow={this.closeModalWindow} handleKeyDown={this.handleKeyDown}/> }
        </div>
        )}
        
        if(status === 'pending'){ return(
            <ImageGalleryPending/>
        )}

}}
export default ImageGallery



ImageGallery.propTypes = {
    images : PropTypes.string,
    error : PropTypes.string,
    imageCount : PropTypes.number,
    status : PropTypes.string,
    totalImg : PropTypes.string, 
    statusMore : PropTypes.string,
    visibility : PropTypes.bool,
    scroll : PropTypes.bool,
}