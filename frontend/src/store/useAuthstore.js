import { create } from "zustand";
import { axiosinstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL = "http://localhost:5000";

export const useAuthstore = create((set, get) => ({
  authuser: null,
  isSigningup: false,
  islogin: false,
  isupdateprofile: false,
  ischeckingauth: true,
  OnlineUsers: [],
  socket: null,

  // ✅ Utility to set user manually
  setAuthuser: (user) => set({ authuser: user }),

  // ✅ SIGN UP
  signup: async (data) => {
    set({ isSigningup: true });
    try {
      const resp = await axiosinstance.post("/auth/signup", data, {
        headers: { "Content-Type": "application/json" },
      });

      set({ authuser: resp.data });
      toast.success("Account created successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningup: false });
    }
  },

  // ✅ LOGIN
  login: async (data) => {
    set({ islogin: true });
    try {
      console.log(data);
      
      const resp = await axiosinstance.post("/jobseekers/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Login response:", resp.data);

      set({ authuser: resp.data.userdata });
      console.log("✅ Stored authuser in Zustand:", get().authuser);

      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("❌ Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ islogin: false });
    }
  },
  loginrec: async (data) => {
    set({ islogin: true });
    try {
      console.log(data);
      
      const resp = await axiosinstance.post("/rec/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Login response:", resp.data);
      const userData = resp.data.userdata;

localStorage.setItem("authuser", JSON.stringify(userData)); // ✅ Correct usage
set({ authuser: userData });
      
      console.log("✅ Stored authuser in Zustand:", get().authuser);

      get().connectSocket();
      toast.success("Logged in successfully");
    } catch (error) {
      console.log("❌ Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ islogin: false });
    }
  },

  // ✅ LOGOUT
  logout: async () => {
    try {
      await axiosinstance.get("/auth/logout", {
        headers: { "Content-Type": "application/json" },
      });

      set({ authuser: null });
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (err) {
      console.error("❌ Logout error:", err);
    }
  },

  // ✅ SOCKET CONNECTION
  connectSocket: () => {
    const { authuser, socket } = get();
    if (!authuser || socket?.connected) return;
    console.log("1");
      // git  
    const newSocket = io(BASE_URL, {
   
      query: {
        userId: authuser._id,
      },
    });

    newSocket.connect();

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ OnlineUsers: userIds });
      console.log(OnlineUsers);
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket?.connected) socket.disconnect();
  },
}));
