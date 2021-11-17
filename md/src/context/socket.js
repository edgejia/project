import React from 'react';
import * as io from "socket.io-client";

export const socket = io('http://127.0.0.1:3002');
export const socketcontext = React.createContext();