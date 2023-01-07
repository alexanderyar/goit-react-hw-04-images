import React from "react";
import { ListItem, ListItemImage } from "./ImageGalleryItem.styled";

import PropTypes from 'prop-types'


export const ImageGalleryItem = ({ data, onImageClick }) => {
    return (
        
        // getting array of pictures, creating collection
        data.map((singleImageInfo) => {
         
            const { id, webformatURL, tags, largeImageURL } = singleImageInfo;
            // console.log(id, webformatURL, tags);
            return (
            <ListItem key={id} onClick={() => onImageClick(largeImageURL)}>
                <ListItemImage src={webformatURL} alt={tags} width="480" />
            </ListItem> )
       
        })
    )
}


//added prop-types
ImageGalleryItem.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired
        })),
     onImageClick: PropTypes.func.isRequired
}