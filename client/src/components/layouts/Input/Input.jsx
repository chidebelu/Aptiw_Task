import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import authContext from '../../../context/auth/authContext'
import "./Input.css"

const Input = () => {
  const [data, setData] = useState("")
  const context = useContext(authContext)
  const {searchWord,  searchedWord} = context
  console.log(searchedWord)
  const onChange = (e) =>{
    e.preventDefault()
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    searchWord(data.word)
    setData("")
  }


 

  return (
    <>
   <form className='app__form' onSubmit={onSubmit}>
    <div className='app__form__input'>
        <input type="text" placeholder="Enter a word..." name="word" onChange={onChange}/>
    </div>
      {
       
        data ? (<div className='app__submit-btn-2'>
       <Link to ="/resultPage"> <input type='submit' value="Go"/> </Link>
          </div>)
          : (
            <div className='app__submit-btn'>
    <input type='submit' value="Go"/>
      </div>
          )
      }
      </form>

     
        
    </>
  )
}

export default Input