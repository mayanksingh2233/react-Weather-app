import React,{useState,useEffect} from "react"
import axios from "axios"

const API_KEY = "enter your api key"



const App=()=>{
   const [search ,setSearch] = useState('')
   const [wheather ,setwheather] = useState({})
   const [checkError,setCheckError]= useState(false)

   const searchWheather=(event)=>{
    if(event.key==='Enter'){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`)
      .then(response=>{
        setwheather(response.data)
        setCheckError(false)
        setSearch('')
      }).catch(err=>{
        setCheckError(true)
        setwheather({})
        console.log(err)
      })
    }
   }

    const dateBuilder=(d)=>{
       let months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day=days[d.getDay()]
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
    }
  return (
    <div className={
      (typeof wheather.main != "undefined")
      ?((wheather.weather[0].main=="Clear")
        ?'app warm':'app')
      :('app')
    }>
      <main>
      <div className="search-box" >
          <input className="search-bar"
           type="text" placeholder="search... " 
           value={search} 
           onChange={(e)=>setSearch(e.target.value)}
           onKeyPress={searchWheather}
            />
      </div>
      {(checkError)&&(<h1 className="search">Please provide a valid city</h1>)}
       {(typeof wheather.main != "undefined")?(
        <div>
             <div className="location-box">
            <div className="location">{wheather.name}, {wheather.sys.country}</div>  
              <div className="date">
                {dateBuilder(new Date())}
              </div>
                    
        </div>
        <div className="wheather-box">
          <div className="temp">{Math.round(wheather.main.temp)}°c</div>
          <div className="wheather">{wheather.weather[0].main}</div>
        </div>
        </div> 
       ):(
          (!checkError? <div>
          <h1 className="search">Search for Wheather</h1>
        </div>  :null)
       )}  
      </main>
      </div>
  );
}

export default App;
