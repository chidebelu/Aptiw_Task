import React, { useContext, useEffect } from 'react'
import Navbar from "../../layouts/Navbar/Navbar"
import "./FavouritePage.css"
import authContext from '../../../context/auth/authContext'

const FavouritePage = () => {
    const context = useContext(authContext)
    const { getFavourites, getfavourites, removeFavourite} = context

    useEffect(()=>{
        getFavourites()
        //eslint-disable-next-line
    },[])
    
    const deleteHandler = (id)=>{
        if(window.confirm("Are you sure?")){
            removeFavourite(id)
        }
    }

  return (
    
        <><Navbar/>
        <div className='app__favourite-page-container'>
            <h2>My Favourites Words</h2>
            {
                getfavourites.length > 0 ?(
                    getfavourites.map((x,index) => (
                    <>
                    <div className='app__favourite-page-content'>{x.word}<span className='app__favourite-page-content-span'  onClick={()=>deleteHandler(x._id)}>X</span></div> {getfavourites[index+1]? "":<><div className='app__favourite-page-content-hr'></div></>}
                    </>))
                ):(<>
                <div>No Favourites Saved Yet</div>
                </>)
            }

        </div>
    </>
  )
}

export default FavouritePage