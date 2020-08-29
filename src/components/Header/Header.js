import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faMagic } from '@fortawesome/free-solid-svg-icons';
 


export const Header = () => {

const [state, setState] = useState({
  url: '',
  link: '',
  active: false,
});
const [toggle, setToggle] = useState({
  switch: false,
});
const [copied, setCopied] = useState({
  copy: false
});
const [errors, setErrors] = useState({
  error: false,
  warning: false,
});
const analyze = (e) => {
  let errors = {};
  if(!/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(state.url)) {
  setErrors({error: true, warning: true})
  };
  return errors.error;
};
const validata = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(state.url)




function copyToClipboard(e) {
  const input = document.getElementById('exe');
  input.select();
  document.execCommand('copy');
  let sel = window.getSelection();
  sel.removeAllRanges(); 
  copyED()
  copyED()
};
const handleChange = (e) => {
  setState({ url: e.target.value });
  setErrors({error: false})
};
const handleSubmit = (e) => {
  if (!e.target.checkValidity()) {
  e.preventDefault();
  analyze()
  axios.post('https://monza-url-shortener.herokuapp.com/api/shorten', {
    active: false,
    url: `https://${state.url}`
  })
    .then( res => {
      if(validata){
        setState({
          link: `https://monza-url-shortener.herokuapp.com/${res.data.hash}`,
          active: true,
          url: `https://monza-url-shortener.herokuapp.com/${res.data.hash}`
        })
      } else {
          setState({
            link: ``,
            active: false,
            url: state.url
          })
      }
      })
      .catch(err => console.log(err))
    } else {
        e.preventDefault();
        analyze()
        axios.post('https://monza-url-shortener.herokuapp.com/api/shorten', {
        url: state.url,
        active: false,
    })
      .then( res => {
        setState({
          link: `https://monza-url-shortener.herokuapp.com/${res.data.hash}`,
          active: true,
          url: `https://monza-url-shortener.herokuapp.com/${res.data.hash}`
        })
      })
      .then((res) => console.log(res.data))
.catch((err) => console.log(err));
  }
};
  
  const copyED = () => {
     setCopied({ copy: true });

     if(copied.copy === true){
    
      setCopied({ copy: true });
  
  } else {
    setTimeout(() => {
      setCopied({ copy: false });
   }, 4000);
  }
  }


  const Toggles = () => {
    setToggle({
      switch: !toggle.switch
    })
  }
 

  const Refresh = () => {
    setState({
      active: false
    })
  }
 
  
  return (
    <>
    <div className={styles.Container}>
    <div className={styles.toggleDiv}>
    <img src={require('../../images/English.jpg')} alt="EN" className={styles.EN}/>
      <input onClick={Toggles} type="checkbox" id="switch" /><label htmlFor="switch" className={styles.label}>Toggle</label>
      <img src={require('../../images/Macedonian.png')} alt="MKD" className={styles.MKD}/>
       </div>
       <div className={styles.FormContainer}>
       <h1 className={styles.Shortener}>Monza URL Shortener</h1>
       <h2 className={styles.ShortenerAlt}>Simplify your links in one click</h2>
        {!state.active ? 
         <form onSubmit={handleSubmit} noValidate  className={styles.Form} >
         <div className={styles.inputContainer}>
         <span className={classNames(errors.warning ? styles.P2 : styles.error
         )}><p className={styles.dronone}>{toggle.switch ? "Neispraven URL" : "Invalid URL"}</p><FontAwesomeIcon icon={faTimes} className={styles.Check}></FontAwesomeIcon></span>
         <input 
         required
         className={styles.input}
         id="exe"
         type="url"
         value={state.url || ""}
         name="url" 
         placeholder={toggle.switch ? "Vnesete link tuka" : "Enter your link here"}
         onChange={handleChange}
         />
       <div className={styles.ButtonContainer}>
       <button type="submit" className={styles.button}>{toggle.switch ? "Skrati" : "Shorten"}<FontAwesomeIcon icon={faMagic} className={styles.Magic} ></FontAwesomeIcon></button>
       </div>
         <FontAwesomeIcon icon={faLink} className={styles.FontIcon}></FontAwesomeIcon>
       </div>
       </form> 
       :
       <form onSubmit={handleSubmit} noValidate className={styles.Form} >
       <div className={styles.inputContainer}>
       <span className={classNames(copied.copy ? styles.P4 : styles.P)}>{state.active ? <p className={styles.drontwo}>{toggle.switch ? "Linkot e skraten uspesno" : "Link shortened successfully"}</p> : null} <FontAwesomeIcon icon={faCheck} className={styles.Check} ></FontAwesomeIcon></span>
       <span className={classNames(copied.copy ? styles.P3 : styles.copyDeactivate)}>{state.active ? <p className={styles.dronthree}>{toggle.switch ? "Kopirano" : "Copied to clipboard"}</p> : null} <FontAwesomeIcon icon={faClipboard} className={styles.ClipboardCopied} ></FontAwesomeIcon></span>
       <input 
       required
       className={styles.input}
       readOnly
       type="url"
       value={state.url}
       name="url" 
       id="exe"
       placeholder="Enter link here"
       onChange={handleChange}
       />
     <div className={styles.ButtonContainer}>
     <div onClick={copyToClipboard} className={styles.buttonClip}> 
       <FontAwesomeIcon icon={faClipboard} className={styles.Clipboard} ></FontAwesomeIcon>
     </div>  


     <div type="submit" className={styles.buttonNew}>
     <div className={styles.Anh} onClick={Refresh} > <i id={styles.Clipboard} className="fa fa-repeat"></i></div>  
    
     </div>
     </div>
       <FontAwesomeIcon icon={faLink} className={styles.FontIcon}></FontAwesomeIcon>
     </div>
     </form> 
    }
    </div>
      <div className={styles.Sectortwo}>
        <div className={styles.text}>
           <p>Made by Monza | 2020
         </p> 
         </div>
         <div className={styles.git}>
           <a target="_blank" rel="noopener noreferrer" href="https://www.github.com/xpmprd">
          <img src={require(`../../images/git1.png`)} alt="git"/>
          </a>
    </div>
  </div>
</div>
</>
  );
}

 
