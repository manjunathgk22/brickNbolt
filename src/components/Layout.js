import React, {useState, useEffect} from 'react';
import axios from 'axios';
const Layout = (props) => {
    const [image, setimage] = useState([]);
    useEffect(() => {
        
        if(localStorage && !localStorage.getItem("login")){
            props.history.push('/');
        }  
        
    }, []);
    useEffect(() => {
        
        setimage(props.images)
    }, [props.images]);
    const getImage = ()=>{
        
        const selected = props.history.location.pathname.split('/')[2];
        let index = 0;
        const length = image.length;
        const col1 = [];
        const col2 = [];
        const col3 = [];
        for(let tempIndex = index; index < Math.floor(length/3) ; index++, tempIndex++){
            col1.push(<img onClick={(event)=>{
                for(let img of document.getElementsByTagName('img')){
                    img.removeAttribute('style');
                }
                event.target.style.border = "2px solid blue"
                props.history.push(`/image/${image[tempIndex].id}`)

            }} style={selected === image[tempIndex].id? {boxShadow: "8px 0px 55px -12px rgba(8,15,138,1)", border: "2px solid blue"}  : null} src={image[index].url} height= {image[index].height}></img>)
        }
        for(let tempIndex = index; index < Math.floor((length/3)*2) ; index++, tempIndex++){
            col2.push(<img onClick={()=>{
                props.history.push(`/image/${image[tempIndex].id}`)
            }} style={selected === image[tempIndex].id? {boxShadow: "8px 0px 55px -12px rgba(8,15,138,1)", border: "2px solid blue", border: "2px solid blue"}  : null} src={image[index].url} height= {image[index].height}></img>)
        }
        for(let tempIndex = index; index < length ; index++, tempIndex++){
            col3.push(<img onClick={()=>{
                props.history.push(`/image/${image[tempIndex].id}`)
            }} style={selected === image[tempIndex].id? {boxShadow: "8px 0px 55px -12px rgba(8,15,138,1)", border: "2px solid blue"}  : null} src={image[index].url} height= {image[index].height}></img>)
        }
        return (
            <div className="masonry-wrapper">
            <div className="col1">
            {col1}
        </div>
        <div className="col2">
            {col2}
        </div>
        <div className="col3">
            {col3}
        </div>
        </div>
        )
        
    }
    return (
        <div>
         {
             getImage()
         }
        </div>
    );
}

export default Layout;
