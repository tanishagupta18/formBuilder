import React from "react";
import styles from "./ChatWindow.module.css";
import botIcon from "/icons/bot.png"; // Ensure this path is correct

const ChatWindow = () => {
  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageContainer}>
        {/* Bot message with icon */}
        <div className={styles.messageWrapper}>
          <img src={botIcon} alt="Bot Icon" className={styles.userIcon} />
          <div className={styles.messageBubble}>
            <div className={styles.messageText}>hello</div>
          </div>
        </div>

        {/* User message without icon */}
        <div className={styles.messageWrapperUser}>
          <div className={styles.messageBubbleUser}>
            <div className={styles.messageTextUser}>Hi</div>
          </div>
        </div>

        {/* Bot message with image */}
        <div className={styles.messageWrapper}>
          <img src={botIcon} alt="Bot Icon" className={styles.userIcon} />
          <div className={styles.messageBubble}>
            <div className={styles.messageText}>
              
              <div>
                <img
                  src="https://betterlinks.io/wp-content/uploads/2021/12/Track-Your-Campaign-URLs-Better-Using-AB-Split-Testing-From-BetterLinks.png"
                  alt="Are you new here?"
                  className={styles.chatImage}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bot message with icon */}
        <div className={styles.messageWrapper}>
          <img src={botIcon} alt="Bot Icon" className={styles.userIcon} />
          <div className={styles.messageBubble}>
            <div className={styles.messageText}>Can you share some details</div>
          </div>
        </div>

        {/* Bot message with icon */}
        <div className={styles.messageWrapper}>
          <img src={botIcon} alt="Bot Icon" className={styles.userIcon} />
          <div className={styles.messageBubble}>
            <div className={styles.messageText}>Great just one more thing</div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Type a message..." />
        <button>{'>'}</button>
      </div>
    </div>
  );
};

export default ChatWindow;
