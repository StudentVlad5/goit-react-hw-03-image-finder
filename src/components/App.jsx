import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

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

App.propTypes = {
  imgSearchName :  PropTypes.string,
  loading: PropTypes.bool
  }
  