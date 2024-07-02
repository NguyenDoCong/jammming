import React from "react";

const Connect = {
    async getToken(authorizationCode) {
        const data = {
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: 'http://localhost:3000',
            client_id: '377e58f4414d457691d4bef860522a93',
            client_secret: 'd16be2785dc24bff8c1159ddf2e34c03'
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data)
        };

        try {
            const response = await fetch('https://accounts.spotify.com/api/token', options);
            const data = await response.json();
            const accessToken = data.access_token;
            // Sử dụng access token để truy cập vào tài khoản Spotify của người dùng
            return accessToken;
        } catch (error) {
            console.error(error);
            return null; // hoặc xử lý lỗi theo cách khác
        }

        // const client_id = '377e58f4414d457691d4bef860522a93';
        // const client_secret = 'd16be2785dc24bff8c1159ddf2e34c03';

        // const authOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        //     body: 'grant_type=client_credentials'
        // };

        // // Xóa các tham số từ URL
        // window.history.pushState({}, document.title, window.location.pathname);

        // fetch('https://accounts.spotify.com/api/token', authOptions)
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json();
        //         }
        //         throw new Error('Network response was not ok.');
        //     })
        //     .then(data => {
        //         // Set token với giá trị mới từ phản hồi
        //         // console.log("Access token:", data.access_token); // Sử dụng giá trị mới của token ở đây
        //         callback(data.access_token);

        //     })
        //     .catch(error => {
        //         console.error('There was a problem with the fetch operation:', error);
        //     });

    }

}

export default Connect;