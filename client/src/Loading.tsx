import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'


type Props = {
  children: string
};

const Loading = ({children}: Props) => {
  
  return (
    <div>
      <h2>{children}</h2>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' />
    </div>
  )
}

export default Loading
