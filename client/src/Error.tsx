import React from 'react'


type Props = {
  imgSrc: string
};

const Error = ({imgSrc}: Props) => {
  
  return (
    <img src={`/${imgSrc}`} alt='' />
  )
}

export default Error
