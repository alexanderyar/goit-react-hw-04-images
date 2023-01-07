import { useState, useEffect } from "react";

import { fetchImagesByString } from "./api";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { SearchBar } from "./SearchBar/SearchBar";



import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";


export const App = () => {

  // created shitload of useStates
  const [searchString, setSearchString] = useState(null);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clickedImageUrl, setClickedImageUrl] = useState(null)

  // state = {
  //   searchString: null,
  //   page: 1,
  //   images: [],
  //   isLoading: false,
  //   showModal: false,
  //   clickedImageUrl: null
  // }
  
 
  
  
  useEffect(() => {
    // checking if this is not the 1st render (searchString is empty)  If it is - return.
    console.log(searchString)
    if (!searchString) { return }
    
    // if searchString has changed we have to reset array of images and make sure pagination page goes to the 1st one as for the new search
    setImages([]);
    setPage(1)
  }, [searchString])
  

  // moved images from ImageGallery state to App state

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchString !== null && prevState.searchString !== this.state.searchString) {
  //     this.setState({ images: [], page: 1 })
  //     console.log('aaaaa')
  //   }

  // fetch data if page number (click on the next page) or searchString (new query) has occured
  useEffect(() => {
    if (!searchString && page === 1) {return}
    console.log('useEffect when page or string change')
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await (fetchImagesByString(searchString, page))
        setImages(prevState => ([...prevState, ...response.hits]))
      } catch (error) {
        console.log(error)
      }
       // add fetched array of pictures to the previous state (immutable)
      
    }
    fetchData()
    
   
     
       setIsLoading(false)
    
    
  }, [page, searchString])


  // changing "page" in this.state to trigger componentDidUpdate
  const loadMore = () => {
    setPage(prevState => prevState + 1)
  }

  // saves input value of SearchBar component to app state "searchString"
  const handleSubmit = e => {
    e.preventDefault()
    console.log(e.currentTarget.elements.imageString.value)
    // checking on if the input is empty
    if (e.currentTarget.elements.imageString.value.trim() === '') {
      alert('please enter some description')
      return
    }
    // set string value and set page to 1
    setSearchString(e.currentTarget.elements.imageString.value)
    setPage(1)
    
    // clear input
    e.currentTarget.elements.imageString.value = '';
    }

  //changing modal toggle ONLY 
  const onModalOpenToggle = () => {
    console.log(showModal)
    setShowModal(prevState => !prevState)
    
  }

   // changing modal toggle AND saving largeImageUrl to the state 
  const passingImageUrlToModal = (largeImageUrl) => {
    onModalOpenToggle()
    setClickedImageUrl(largeImageUrl)
  }
    
  return (
    <div>
       
        
        {showModal === true && <Modal data={clickedImageUrl} onClose={onModalOpenToggle} />}
        
        <SearchBar onSubmit={handleSubmit} stringQuery={searchString} />
        
        <ImageGallery images={images} onImageClick={passingImageUrlToModal} />
        
        {images.length > 0 && <Button onClick={loadMore} />}
        
        {isLoading === true && <Loader/>}
    </div>
  );
};

  

  
  
    // if (prevState.page !== this.state.page || prevState.searchString !== this.state.searchString) {
      
      
    //   // test if searchString check is working
    //   // console.log('asdasdasdasdasdadasdasadasd')
           
    //   //fetch using API func searchImageByString
    //   //    console.log(await fetchImagesByString(this.props.searchString))
           
    //   //activating isLoading
    //   this.setState({isLoading: true})

    //   // fetching images for gallery
    //   const response = await (fetchImagesByString(this.state.searchString, this.state.page))
    //   console.log(await response.hits)
    //   // this.setState(prevState => ({ images:   })
    //   // )

    //   // creating immutable state. spreading previously fetched images + adding new to the new array 
    //   this.setState(prevState => ({ images: [...prevState.images, ...response.hits]   }))
    //      this.setState({isLoading: false})
    // }
    
    
    // }





  // // changing "page" in this.state to trigger componentDidUpdate
  // loadMore = () => {
  //   this.setState(prevState => ({page: prevState.page + 1}))
  // }

// // saves input value of SearchBar component to app state "searchString"
//   handleSubmit = e => {
//     e.preventDefault()
//     console.log(e.currentTarget.elements.imageString.value)
//     // checking on if the input is empty
//     if (e.currentTarget.elements.imageString.value.trim() === '') {
//       alert('please enter some description')
//       return
//     }

//     this.setState({ searchString: e.currentTarget.elements.imageString.value, page: 1 })
    
//     // clear input
//     e.currentTarget.elements.imageString.value = '';
//     }
  
  // //changing modal toggle ONLY 
  // onModalOpenToggle = () => {
    
  //   this.setState(({ showModal }) => ({ showModal: !showModal }))
  // }

  // changing modal toggle AND saving largeImageUrl to the state 
  // passingImageUrlToModal = (largeImageUrl) => {
  //   this.onModalOpenToggle()
  //   this.setState(({ clickedImageUrl }) => ({ clickedImageUrl: largeImageUrl }))
  // }


//   render() {
//     return (
//     <div
//       // style={{
//       //   height: '100vh',
//       //   display: 'flex',
//       //   justifyContent: 'center',
//       //   alignItems: 'center',
//       //   fontSize: 40,
//       //   color: '#010101'
//       // }}
//       >
       
        
//         {this.state.showModal === true && <Modal data={this.state.clickedImageUrl} onClose={this.onModalOpenToggle} />}
        
//         <SearchBar onSubmit={this.handleSubmit} stringQuery={this.state.searchString} />
        
//         <ImageGallery images={this.state.images} onImageClick={this.passingImageUrlToModal} />
        
//         {this.state.images.length > 0 && <Button onClick={this.loadMore} />}
        
//         {this.state.isLoading === true && <Loader/>}
//     </div>
//   );
// };

//   }
  