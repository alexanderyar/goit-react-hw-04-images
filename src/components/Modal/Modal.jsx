import React, {useEffect } from "react";
import { Overlay, ModalWindow } from "./Modal.styled";
import { createPortal } from "react-dom";

import PropTypes from 'prop-types'

//creating var for portal for modal to avoid z-index troubles
const modalRoot = document.querySelector('#modal-root')

export const Modal = ({data, onClose}) => {

// adding listener on escape
    // componentDidMount() {
    //     console.log('mount _______')
    //     window.addEventListener('keydown', this.handleKeyDown )
    // }

    // adding listener on escape using UseEffect AND removing listenter on escape using "return" of given UseEffect
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.code === 'Escape') {
                console.log('escape triggered')
                onClose()
            }
    }
     console.log('mount _______')
        window.addEventListener('keydown', handleKeyDown)  
        return () => {
         window.removeEventListener('keydown', handleKeyDown)
      }
    }, [onClose])

 
    
    

// removing listenter on escape
    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleKeyDown)
    // }
// creating method so we can use it to add/remove listener (not anounymous function)
//    const handleKeyDown = e => {
//             if (e.code === 'Escape') {
//                 console.log('escape triggered')
//                 onClose()
//             }
//     }
    
//close modal if clicked on modal backdrop
   const handleBackdropClick = (e) => {
        console.log('click on backdrop')
        if (e.currentTarget === e.target) {
        onClose()
    }
}



   return (
       
        createPortal(<Overlay onClick={handleBackdropClick}>
            <ModalWindow>
                <img src={data} width="100%" alt="" />
            </ModalWindow>
        </Overlay>, modalRoot)
        
   )
}


// added prop-types
Modal.propTypes = {
    data: PropTypes.string,
    onClose: PropTypes.func
}