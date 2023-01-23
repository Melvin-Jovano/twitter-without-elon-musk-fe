import { io } from "socket.io-client";
import { refreshToken } from "../api/auth";

export default class ClientSocket {
    constructor(path, port) {
        this.socket = io(`ws://localhost:${port}${path}`, {
            query: {
                token: localStorage.getItem('accessToken')
            }
        });
        this.connect();
    }

    connect() {
        this.socket.on('connect', () => {
            this.socket.on('auth', async (isAuthenticated) => {
                if(!isAuthenticated) {
                    const refresh = await refreshToken();
                    if(refresh.data.message === 'SUCCESS') {
                        localStorage.setItem('accessToken', refresh.data.accessToken);
                        localStorage.setItem('refreshToken', refresh.data.refreshToken);
                    }

                    this.socket = io(`ws://localhost:${port}${path}`, {
                        query: {
                            token: refresh.data.accessToken
                        }
                    });
                    this.connect();
                }
            });

            this.socket.on('new-chat', (data) => {
                
            });
        });
    }
}

