import { Box, Link } from "@mui/material";
import React, { useEffect } from "react";
import Contact from "./Contact";

const ListContact = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.tudongchat.com/js/chatbox.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const tudong_chatbox = new window.TuDongChat("VkOgaJcQW5yIk0Fg0kPx6");
      tudong_chatbox.initial();
    };

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  return (
    <Box position={"fixed"} bottom={40} left={10} zIndex={999}>
      <Link href="https://www.facebook.com/quan.laquy.21.03" target="_blank">
        <Contact
          image={"/img/common/FacebookContact.png"}
          bgFill={"rgb(24 ,119 ,242,0.7)"}
          bsFill={"0 0 0 0 #1877F2"}
          bgCircle={"#1877F2"}
        />
      </Link>
      <Link href="https://zalo.me/0397144780" target="_blank">
        <Contact
          image={"/img/common/ZaloContact.png"}
          bgFill={"rgba(33,150,243,.7)"}
          bsFill={"0 0 0 0 #2196F3"}
          bgCircle={"#2196F3"}
        />
      </Link>
      <Link href="tel:0397144780" target="_blank">
        <Contact
          image={"/img/common/PhoneContact.png"}
          bgFill={"rgb(221,51,51,.7)"}
          bsFill={"0 0 0 0 #dd3333"}
          bgCircle={"#dd3333"}
        />
      </Link>

      <div id="chatbox-container" style={{ position: "fixed", bottom: 0, right: 10, zIndex: 1000 }}></div>
    </Box>
  );
};

export default ListContact;
