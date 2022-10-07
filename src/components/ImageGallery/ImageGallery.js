import {Component} from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'


class ImageGallery extends Component {
    state = {
        images: '',
        error: null,
        status: 'idle'
       }
    componentDidUpdate(prevProps, prevState){
if(prevProps.imgSearchName !== this.props.imgSearchName)
{   
    this.setState({status:'pending'});
    fetch(`https://pixabay.com/api/?q=${this.props.imgSearchName}&page=1&key=29531534-c6f4c4079f81828b6fd250707&image_type=photo&orientation=horizontal&per_page=12`)
    .then(res=>{if(res.ok){return res.json()}
    return Promise.reject(new Error(`Can't find anything with ${this.props.imgSearchName}`))})
    .then(images => this.setState({images, status:'resolved'}))
    .catch(error=>this.setState({error, status:'reject'}))
    

}}
    render() {
        let imgForSearch = this.state.images;
        const {error, status} = this.state;
         
        if(status === 'idle'){ return(
            <div>Чекаємо на запит</div>
        )}

        if(status === 'pending'){ return(
            <div>Чекаємо на запит</div>
        )}

        if(status === 'reject'){return(
            <div>{error.message}</div>
        )}

        if(status === 'resolved'){ return (
            <ul className="ImageGallery">
            <ImageGalleryItem liItem={imgForSearch.hits}/>
            </ul>)
        }
        

}}
export default ImageGallery