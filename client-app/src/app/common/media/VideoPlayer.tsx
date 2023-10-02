import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const VideoPlayer = () => {
    const isMobile = useMediaQuery({ maxWidth: 390 }); // Set the maximum width for mobile devices
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    return (
        <div style={{

            width: `${screenWidth}px`
           
        }}>
            <video
                src="assets/Video/demo.mp4"
                autoPlay
                loop
                muted
                controls={false} // Show controls on mobile devices
                style={{ width: '100%' }}
            >
                Sorry, your browser doesn't support embedded videos.
            </video>
        </div>
    );
};

export default VideoPlayer;


