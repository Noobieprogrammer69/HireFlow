import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

const [notifications,setNotifications] = useState([]);

const addNotification = (notif)=>{

setNotifications(prev=>[notif,...prev]);

};

return(

<NotificationContext.Provider
value={{
notifications,
addNotification
}}
>

{children}

</NotificationContext.Provider>

);

};

export const useNotification = ()=>{

return useContext(NotificationContext);

};