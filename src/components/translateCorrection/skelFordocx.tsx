import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const SkelForDocx = () => {
  return (
    <div className='w-[100%] !h-[550px] bg-white  bg-opacity-30'>
      <div className='w-[100%] !h-[550px]   flex justify-center items-center'>
        <ClipLoader
          color={"#5B0888"}
          loading={true}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  )
}

export default SkelForDocx