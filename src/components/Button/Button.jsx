import React from "react";
import { ButtonStyled } from "./Button.styled";

import PropTypes from 'prop-types'


export const Button = ({ onClick }) => {
    return (
        <ButtonStyled type="button" onClick={onClick} >Load more</ButtonStyled>
    )
}


//added prop-types
Button.propTypes = {
    onClick: PropTypes.func.isRequired
}