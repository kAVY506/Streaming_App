import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Use axios for making API requests

const VideoPlayer = () => {
  const { id } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Fetch video URL from the backend
        const { data } = await axios.get(`http://localhost:7000/api/videos/stream/${id}`);
        setVideoSrc(data.videoUrl); // Use the returned URL
        setLoading(false);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video. Please try again later.');
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="video-player-container">
      <h2>Video Player</h2>
      {videoSrc ? (
        <video controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Video not found.</p>
      )}
    </div>
  );
};

export default VideoPlayer;
