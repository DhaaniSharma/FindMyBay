import React, {useState, useEffect} from 'react'; 


const PreLoader = ({ onVideoEnd }) => {
    const [videoEnded, setVideoEnded] = useState(false);
    const videoRef = useRef(null); // It targets the video element with the useRef hook. 

    useEffect(() => {
        const videoElement = videoRef.current ; 

        if(videoElement){
            const handleVideoEnd = () => {
                setVideoEnd(true); 
                onVideoEnd(); 
            }; 

            videoElement.addEventListener('ended', handleVideoEnd); 

            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd); 
            };
        }
    }, [onVideoEnd]); 

    const videoUrl = "https://www.w3schools.com/html/mov_bbb.mp4"; 

    return(
        <div className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <video 
              id = "preloader-video"
              ref = {videoRef} // This statement links the ref with video element 
              className = "w-full h-full object-cover"
              src = {videoUrl}
              autoPlay 
              muted
              playsInline
            />
        </div>
    );
}; 

export default PreLoader; 