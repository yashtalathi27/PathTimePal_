import { create } from "zustand";
import { axiosinstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client"
// import { logout } from "../../../backend/src/controllers/auth.controller.js";
const BASE_URL="http://localhost:8001"
export const useAuthstore = create((set,get) => ({
  authuser: null,
  isSigningup: false,
  islogin: false,
  isupdateprofile: false,
  ischeckingauth: true,
   OnlineUsers:[],
  socket:null,
  

  signup: async (data) => {
    try {
        // console.log(data);
      const resp = await axiosinstance.post("/auth/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      set({ authuser: resp.data });
      authuser= resp.data;
      toast.success("Account created successfully");
      get().connectSocket();

    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }finally {
        set({ isSigningup: false });
      }
  },
  logout:async()=>{ 
    try{
      const resp=await axiosinstance.get("/auth/logout", {
        headers: { "Content-Type": "application/json" }});
        set({authuser:null});
        toast.success("logout successfully");
        get().disconnectSocket();
    } 
    catch(err){
        console.log(err)
    }
  },
  login: async (data) => {
    try {

        const resp = await axiosinstance.post("/auth/login", data, {
            headers: { "Content-Type": "application/json" }
        });

        set({ authuser: resp.data });
      // authuser= resp.data;
    // console.log("connectinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg");

      get().connectSocket();

        // console.log(authuser); // Corrected console log

        toast.success("Logged in successfully"); // Should now work
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
    }
}
,
  connectSocket:()=>{
    const {authuser}=get();
    if(!authuser||get().socket?.connected)return;
    const socket=io(BASE_URL,{query:{
      userId:authuser._id
    }
    });
    socket.connect();

    set({socket:socket});
    socket.on("getOnlineUsers",(userId)=>{
      set({OnlineUsers:userId});
    })
  },
  disconnectSocket:()=>{
    if(get().socket?.connected)get().socket.disconnect();
  }
}));
