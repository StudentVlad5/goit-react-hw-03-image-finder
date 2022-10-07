import {Component} from "react";
import { toast } from 'react-toastify';
import {FaSearchengin} from "react-icons/fa";


class Searchbar extends Component {
state = {
  searchName:''
}

handleChangeName = event => this.setState({searchName: event.currentTarget.value.toLowerCase()});

handleSubmit = event => {
  event.preventDefault();
  if(this.state.searchName.trim() === ''){return toast.warn('Прошу внести дані для пошуку!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    })}
  this.props.onSubmitForm(this.state.searchName);
  this.setState({searchName:''})
}

render(){ return (
<header className="Searchbar">
  <form className="SearchForm" onSubmit={this.handleSubmit}>
    <button type="submit" className="SearchForm-button" ><FaSearchengin style={{width:30, height: 30, fill: "blue"}}/>
      <span className="SearchForm-button-label">Search</span>
    </button>
    <input
      className="SearchForm-input"
      type="text"
      autoComplete="true"
      autoFocus={true}
      placeholder="Search images and photos"
      value={this.state.searchName}
      onChange={this.handleChangeName}
    />
  </form>
</header>)
}}
export default Searchbar