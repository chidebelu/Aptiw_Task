import React, {useState, useContext} from 'react'
import Navbar from '../../layouts/Navbar/Navbar'
import authContext from '../../../context/auth/authContext'
import "./ResultPage.css"

const ResultPage = () => {
    const [data, setData] = useState({word:""})
    const context = useContext(authContext)
    const {searchWord,  searchedWord, addFavourite} = context
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
     
    }

    const onClick = (e) =>{
        e.preventDefault()
        console.log(data.word)
        addFavourite(data.word)
    }

    return (
      <>
      <Navbar/>
      <div className='app__ResultPage-container'>
     <form className='app__ResultPage-form' onSubmit={onSubmit}>
      <div className='app__form__ResultPage'>
          <input type="text" placeholder="Enter a word..." name="word" onChange={onChange}/>
      </div>
        <div className='app__ResultPage-form-input'>
        {
         
          data ? (<div className='app__ResultPage-submit-btn-2'>
          <input type='submit' value="Go"/>
            </div>)
            : (
              <div className='app__ResultPage-submit-btn'>
      <input type='submit' value="Go"/>
        </div>
            )
        }
        </div>
        </form>

        <>
        <div className='app__addtofavourites'>
            <p onClick={onClick}>Add to Favourites</p>
        </div>
        <div className='app__ResultPage-definitions'>
        {
            searchedWord.map((x, index) =>{
            const synonyms = x?.synonyms?.join(", ")
            return<>
             <h3 className='app__ResultPage-definitions-h3' style={{margin:"20px 0 0 0"}}>Definition {index+1}:</h3><br></br>
            <p>{x.definition}</p>  <br></br>
           <em> <p>{x.partOfSpeech}</p> </em> <br></br>
        <span >Synonyms:<span className='app__ResultPage-definitions-Synonyms'> {synonyms}</span></span>
        </>}
            )
        }
        </div>
    </>
      
        </div>
      </>
    )
  }
  
  export default ResultPage