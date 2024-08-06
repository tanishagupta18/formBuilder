import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ChatContext } from '../Contexts/chatContext';
import styles from './ChatWindow.module.css';
import botIcon from '/icons/bot.png'; // Ensure this path is correct
import { VscSend } from "react-icons/vsc";
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageNotFound from './PageNotFound';

// const chatData = [
//   { type: 'input', input_type: 'Button', placeholder: 'Hi', _id: '66ad251ee1936fa5a37013fd' },
//   { type: 'bubble', input_type: 'Image', placeholder: 'https://betterlinks.io/wp-content/uploads/2021/12/Track-Your-Campaign-URLs-Better-Using-AB-Split-Testing-From-BetterLinks.png', _id: '66ad055be1936fa5a3701284' },
//   { type: 'bubble', input_type: 'Text', placeholder: 'Test', _id: '66ad055be1936fa5a3701285' },
 
//   { type: 'input', input_type: 'Email', placeholder: '', _id: '66ad251ee1936fa5a37013fa' },
//   { type: 'input', input_type: 'Email', placeholder: '', _id: '66ad251ee1936fa5a37013fb' },
//   { type: 'input', input_type: 'Date', placeholder: '', _id: '66ad251ee1936fa5a37013fc' },
//   { type: 'input', input_type: 'Button', placeholder: 'Hi', _id: '66ad251ee1936fa5a37013fd' },
//   { type: 'input', input_type: 'Phone', placeholder: '', _id: '66ad251ee1936fa5a37013fe' },
//   { type: 'input', input_type: 'Rating', placeholder: '', _id: '66ad251ee1936fa5a37013ff' },
//   { type: 'input', input_type: 'Button', placeholder: 'Hi', _id: '66ad055be1936fa5a3701286' },
// ];

const colors = {
  light: '#ffffff',
  dark: '#171923',
  tat_blue: '#508C9B'
};
const ChatWindow = () => {
  const { currentIndex, nextStep, responses,getFormContent } = useContext(ChatContext);
  const [chatData, setChatData] = useState(null);
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  useEffect(() => {
    // Create an AbortController to cancel requests if needed
    const controller = new AbortController();
    const signal = controller.signal;

    // Define the async function inside useEffect
    const fetchData = async () => {
      try {
        if (id) {
          const responses = await getFormContent(id, signal);
          if(responses){
            const { content, theme } = responses; 

            setChatData(content); 
            setTheme(theme);
            document.body.style.backgroundColor = colors[theme] || '#fff';
          }else{
            setChatData(null); 
            setTheme('light');
            document.body.style.backgroundColor = colors['light'];
          }
         
          
        } else {
          toast.error('URL is incorrect');
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching data:', error);
          toast.error('Failed to fetch form data');
        }
      }finally {
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();

    // Cleanup function to abort fetch request on unmount
    return () => controller.abort();
  }, [id]);
  

  const currentItem = useMemo(() => {
    return chatData?.[currentIndex] || {};
  }, [chatData, currentIndex]);

  useEffect(() => {
    // Automatically go to the next item for bubble types after 3 seconds
    if (currentItem && currentItem.type === 'bubble') {
      const timer = setTimeout(() => {
        nextStep();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentItem, nextStep]);
 
  if (loading) {
    return <p>Loading...</p>;
  }
  if(!chatData){
    return <PageNotFound />
  }

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageContainer}>
        {chatData.slice(0, currentIndex + 1).map((item, index) => (
          <div key={item._id} className={item.type === 'bubble' || ((!responses[index] || 0 == currentIndex) && item.input_type == 'Button') ? styles.messageWrapper : styles.messageWrapperUser}>
            {item.type === 'bubble' && 
              <Bubble item={item} index ={index}  />}

            {item.type === 'input' && (
              <Input item={item} index ={index} />
            )}
          </div>
        ))}
      </div>

      {/* Input area (Optional for extra inputs at the bottom) */}
      {/* <div className={styles.inputContainer}>
        <input type="text" placeholder="Type a message..." />
        <button>{'>'}</button>
      </div> */}
    </div>
  );
};
const Bubble = ({ item,index }) => {
  const renderContent = () => {
    switch (item.input_type) {
      case 'Image':
      case 'GIF':
        return <Image url={item.placeholder} key={index}/>;
      case 'Video':
        return <Video url={item.placeholder} key={index} />;
      default:
        return <InputLabel text={item.placeholder} key={index} />;
    }
  };

  return (
    <>
      <img src={botIcon} alt="Bot Icon" className={styles.userIcon} />
      <div className={styles.messageBubble}>
        {renderContent()}
      </div>
    </>
  );
};

const InputLabel = ({ text }) => {
  return <div className={styles.messageText}>{text}</div>;
};

const Image = ({ url }) => {
  return <img src={url} alt="Bubble" className={styles.chatImage} />;
};

const Video = ({ url }) => {
  return  <video 
  src={url} 
  controls 
  autoPlay 
  className={styles.chatImage} 
  >
  Your browser does not support the video tag.
</video>
};

const Input = ({item,index}) => {
  const {currentIndex} = useContext(ChatContext);
  const renderContent = () => {
    switch (item.input_type) {
     
      case 'Rating':
        return <Rating key={index} index={index} />;
      case 'Button':
        return <Button text={item.placeholder} index={index} />;
      default:
        return <InputText text={item.input_type} key={index} index={index} />;
    }
  };

  return (
    <>
    
        {renderContent()}
    </>
  );
}
const Button = ({text,index}) => {
  const {handleInputSubmit,currentIndex} = useContext(ChatContext);
  if(index < currentIndex)
  return <div><button type="submit" style={{backgroundColor:'#FF8E21'}} className={styles.inputButton} disabled ={index < currentIndex}>{text}</button></div>
  return <>
  <img src={botIcon} alt="Bot Icon" className={styles.userIcon} />
  
    <button type="submit" style={{alignSelf:'flex-start'}} className={styles.inputButton} disabled ={index < currentIndex} onClick={()=>handleInputSubmit(text)}>{text}</button>

</>
}
const InputText = ({text,index}) =>{
  const {handleInputSubmit,currentIndex,responses} = useContext(ChatContext);
  const [currentVal, setCurrentVal] = useState(responses[index] || '');
 
  return (
    <div className={styles.inputBox}>
    <input
      type={text.toLowerCase()}
      placeholder={`Enter your ${text.toLowerCase()}`}
      className={`${styles.inputField} ${index < currentIndex ? styles.disabled : ''}`}
      value={currentVal}
      onChange={(e) => setCurrentVal(e.target.value)}
      required
      disabled ={index < currentIndex}
    />
    <button disabled ={index < currentIndex} className={`${styles.sendBtn} ${index < currentIndex ? styles.disabled : ''}`} onClick={()=>handleInputSubmit(currentVal)}><VscSend className={styles.sendIcon} /></button>
    </div>
  )
}
const Rating = ({index}) => {
  const {handleInputSubmit,currentIndex,responses} = useContext(ChatContext);
  const ratings = [1, 2, 3, 4, 5];
  const [selectedRating, setSelectedRating] = useState(responses[index] || '');

  const handleRatingClick = (rating) => {
    console.log(1)
    setSelectedRating(rating);
  };
  return (
    <div className={styles.inputBox} style={{gap:'0.6rem'}}>
    <div className={`${styles.ratingContainer} ${index < currentIndex ? styles.disabled : ''}`}>
      {ratings.map((rating) => (
        <div
          key={rating}
          className={`${styles.ratingCircle} ${
            selectedRating === rating ? styles.selected : ''
          }`}
          onClick={() => handleRatingClick(rating)}
          disabled ={index < currentIndex} 
        >
          {rating}
        </div>
      ))}
      </div>
      <button disabled ={index < currentIndex} className={`${styles.sendBtn} ${index < currentIndex ? styles.disabled : ''}`}><VscSend className={styles.sendIcon} onClick={() => handleInputSubmit(selectedRating)} /></button>
      
    </div>
  )
}
export default ChatWindow;
