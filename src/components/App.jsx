import React,{ Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
state = {
      imgSearchName: '',
      loading: false
  
     }

handleFormSubmit = (searchName) => {
this.setState({imgSearchName:searchName})
}
  render() {

  return (
    <div className="App">
        <Searchbar onSubmitForm={this.handleFormSubmit}/>
        <ImageGallery imgSearchName={this.state.imgSearchName}/>
        <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
  </div>
  );
}}

