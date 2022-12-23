import { Component } from "react";

  
import { fetchImagesByString } from "./api";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";



import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";


export class App extends Component {

state = {
  searchString: null,
  page: 1,
  images: [],
  isLoading: false,
  showModal: false,
  clickedImageUrl: null
}
  
 
  

  // moved images from ImageGallery state to App state
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchString !== null && prevState.searchString !== this.state.searchString) {
      this.setState({ images: [], page: 1 })
      console.log('aaaaa')
    }
    if (prevState.page !== this.state.page || prevState.searchString !== this.state.searchString) {
      
      
      // test if searchString check is working
      // console.log('asdasdasdasdasdadasdasadasd')
           
      //fetch using API func searchImageByString
      //    console.log(await fetchImagesByString(this.props.searchString))
           
      //activating isLoading
      this.setState({isLoading: true})

      // fetching images for gallery
      const response = await (fetchImagesByString(this.state.searchString, this.state.page))
      console.log(await response.hits)
      // this.setState(prevState => ({ images:   })
      // )

      // creating immutable state. spreading previously fetched images + adding new to the new array 
      this.setState(prevState => ({ images: [...prevState.images, ...response.hits]   }))
         this.setState({isLoading: false})
    }
    
    
    }





  // changing "page" in this.state to trigger componentDidUpdate
  loadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
  }

// saves input value of SearchBar component to app state "searchString"
  handleSubmit = e => {
    e.preventDefault()
    console.log(e.currentTarget.elements.imageString.value)
    // checking on if the input is empty
    if (e.currentTarget.elements.imageString.value.trim() === '') {
      alert('please enter some description')
      return
    }

    this.setState({ searchString: e.currentTarget.elements.imageString.value, page: 1 })
    
    // clear input
    e.currentTarget.elements.imageString.value = '';
    }
  
  //changing modal toggle ONLY 
  onModalOpenToggle = () => {
    
    this.setState(({ showModal }) => ({ showModal: !showModal }))
   
    
    
  }

  // changing modal toggle AND saving largeImageUrl to the state 
  passingImageUrlToModal = (largeImageUrl) => {
    this.onModalOpenToggle()
    this.setState(({ clickedImageUrl }) => ({ clickedImageUrl: largeImageUrl }))
  }


  render() {
    return (
    <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101'
      // }}
      >
       
        
        {this.state.showModal === true && <Modal data={this.state.clickedImageUrl} onClose={this.onModalOpenToggle} />}
        
        <SearchBar onSubmit={this.handleSubmit} stringQuery={this.state.searchString} />
        
        <ImageGallery images={this.state.images} onImageClick={this.passingImageUrlToModal} />
        
        {this.state.images.length > 0 && <Button onClick={this.loadMore} />}
        
        {this.state.isLoading === true && <Loader/>}
    </div>
  );
};

  }
  