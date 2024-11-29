import React, { useState, useRef, useEffect } from "react";

function Home() {
 
  const songs = [
    {
      name: "Hey Rangule",
      image: "https://m.media-amazon.com/images/M/MV5BM2YzODVmMjAtMDFmNC00ZWE5LTg3NjEtYTdlZmU2YzI3YTg1XkEyXkFqcGc@._V1_.jpg",
      audio: "/[iSongs.info] 01 - Hey Rangule.mp3", 
      movie: "Amaran",
    },
    {
      name: "Raa Macha Macha",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiNjz95c6-WUvkMfi8Rjwne9_bMMM1w_wXSQ&s",
      audio: "[iSongs.info] 02 - Raa Macha Macha.mp3",
      movie: "Game Changer",
    },
    {
      name: "A Life Full OF Love",
      image: "https://i.pinimg.com/736x/30/5a/49/305a4911b39e43efd7aba1646e055503.jpg",
      audio: "/[iSongs.info] 01 - A Life Full Of Love.mp3",
      movie: "3",
    },
    {
      name:"Daavudi",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtErvbPQK-f7mrO5briquIykd4Epn18r92ow&s",
      audio: "/[iSongs.info] 04 - Daavudi.mp3",
      movie: "Devara",
    },
    {
      name: "manasilaayo",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6I_CwGQSV2oAsmCmA7rgGHIEyuVlDTuEUwQ&s",
      audio: "/[iSongs.info] 01 - Manasilaayo.mp3",
      movie: "vettaiyan",
    },
    {
        name:"Chuttamalle",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtErvbPQK-f7mrO5briquIykd4Epn18r92ow&s",
        audio: "/[iSongs.info] 03 - Chuttamalle.mp3",
        movie: "Devara",
    },
    {
        name: "Kannulada",
        image: "https://i.pinimg.com/736x/30/5a/49/305a4911b39e43efd7aba1646e055503.jpg",
        audio: "/[iSongs.info] 03 - Kannuladha.mp3",
        movie: "3",
    },
    {
      name: "KA Mass Jathara",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWrKQt4B7E3j54PAqU0r2-aOG1ga4WgKS6AxE1rDBdIr5Bznb44sOj7t0gP4p9o1v1wr4&usqp=CAU",
      audio: "/[iSongs.info] 03 - Ka Mass Jathara.mp3",
      movie: "KA",
    },
    {
        name:"Ayudha pooja",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtErvbPQK-f7mrO5briquIykd4Epn18r92ow&s",
        audio: "/[iSongs.info] 06 - Ayudha Pooja.mp3",
        movie: "Devara",
    },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  // Play or Pause the song
  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle song change (Next/Previous)
  const changeSong = (direction) => {
    let newIndex = currentSongIndex + direction;
    if (newIndex < 0) newIndex = songs.length - 1; // Loop to last song
    if (newIndex >= songs.length) newIndex = 0; // Loop to first song
    setCurrentSongIndex(newIndex);
  };

  // Handle song progress update
  const handleTimeUpdate = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  // Set the current time based on progress bar click
  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = (clickX / rect.width) * 100;
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
  };

  // Set current song details when clicked
  const playSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Reset audio when the current song changes
  useEffect(() => {
    if (currentSongIndex !== null) {
      // When the song changes, reset audio source and play
      audioRef.current.load();  // Reload the audio element with new source
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSongIndex]);

  return (
    <div className="h-screen bg-[url('https://img.freepik.com/free-vector/glowing-musical-pentagram-background-with-sound-notes_1017-31220.jpg')] bg-cover bg-no-repeat bg-center flex gap-48">
      <div className="flex flex-col w-1/3">
   
        <div className="flex flex-col justify-center">
          {songs.map((song, index) => (
            <div
              key={index}
              className="flex flex-row gap-7 w-96 bg-slate-300  mt-4 p-2 rounded-lg cursor-pointer hover:bg-slate-400"
              onClick={() => playSong(index)}
            >
            
              <div className="w-10 h-10 bg-white rounded-lg overflow-hidden">
                <img
                  src={song.image}
                  alt={`Album cover of ${song.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-lg font-semibold text-blue-800">{song.name}</h1>
            </div>
          ))}
        </div>
      </div>

      {/* Song Details and Controls on the right */}
      {currentSongIndex !== null && (
        <div className="flex flex-col items-center justify-between bg-gray-800 p-4 rounded-lg mt-6 w-2/4 h-auto">
          <div className="flex flex-col items-center text-white">
            <img
              src={songs[currentSongIndex].image}
              alt={songs[currentSongIndex].name}
              className="w-96 h-96 object-cover rounded-lg"
            />
            <h2 className="text-lg mt-2">{songs[currentSongIndex].name}</h2>
            <h3 className="text-sm text-gray-300">{songs[currentSongIndex].movie}</h3>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div
              className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
                <button className="mr-6 text-white text-3xl">
                  +
                </button>
              <button
                onClick={() => changeSong(-1)}
                className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600"
              >
                Prev
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
              <button
                onClick={() => changeSong(1)}
                className="bg-gray-700 p-2 rounded-full text-white hover:bg-gray-600"
              >
                Next
              </button>
              <button className="w-10 text-xl">
              🤍
              </button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={songs[currentSongIndex].audio}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => changeSong(1)} // Move to the next song when the current one ends
          ></audio>
        </div>
      )}
    </div>
  );
}

export default Home;
