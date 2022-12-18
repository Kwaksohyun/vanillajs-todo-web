const musicPlayer = document.getElementById("music-player");
const musicImg = document.getElementById("music-img");
const musicName = document.getElementById("music-name");
const artist = document.getElementById("artist");

const progressBar = document.getElementById("progress-bar");
const currentTime = document.querySelector(".current");
const durationTime = document.querySelector(".duration");
const playPausedBtn = document.querySelector("button#play-paused");
const playPausedBtnImg = playPausedBtn.querySelector("img");
const nextBtn = document.querySelector("button#next");
const prevBtn = document.querySelector("button#prev");

const PAUSED_CLASSNAME = "paused";

// Youtube API 불러오는 부분
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
/* 
 * onYouTubeIframeAPIReady 함수는 필수로 구현해야 한다.
 * 플레이어 API에 대한 JavaScript 다운로드 완료 시 API가 이 함수 호출한다.
 * 페이지 로드 시 표시할 플레이어 개체를 만들어야 한다.
 */
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: "130",
        width: "330",
        videoId: `${PLAYLIST[currentPlayerList].videoId}`,
        events: {
            'onReady' : onPlayerReady,
            'onStateChange' : onPlayerStateChange       // 플레이어의 상태가 변경될 때마다 실행
        },
    });
}

const PLAYLIST = [
    {
        name: "Square (2017)",
        artist: "백예린 (Yerin Baek)",
        img: "https://img.youtube.com/vi/4iFP_wd6QU8/mqdefault.jpg",
        // audio: "",
        videoId: "4iFP_wd6QU8",
    },
    {
        name: "Rest",
        artist: "백예린(Yerin Baek)",
        img: "https://img.youtube.com/vi/IqfFZ5cJ-WU/mqdefault.jpg",
        // audio: "",
        videoId: "IqfFZ5cJ-WU",
    },
    {
        name: "산책",
        artist: "백예린(Yerin Baek)",
        img: "https://img.youtube.com/vi/t9aZFgD0mic/mqdefault.jpg",
        // audio: "",
        videoId: "t9aZFgD0mic",
    },
    {
        name: "she likes spring, I prefer winter",
        artist: "slchld",
        img: "https://img.youtube.com/vi/-F1G2vgta6o/mqdefault.jpg",
        // audio: "",
        videoId: "-F1G2vgta6o",
    },
];

function handleUpdateCurrentTime() {
    let currentMin = Math.floor(player.getCurrentTime()/60);
    let currentSec = String(Math.floor(player.getCurrentTime()%60)).padStart(2, "0");
    currentTime.innerText = `${currentMin}:${currentSec}`;

    let progressWidth = (player.getCurrentTime()/player.getDuration())*100;
    progressBar.style.width = `${progressWidth}%`;
}

function handleLoadDurationTime() {
    let durationMin = Math.floor(player.getDuration()/60);
    let durationSec = String(Math.floor(player.getDuration()%60)).padStart(2, "0");
    durationTime.innerText = `${durationMin}:${durationSec}`;
}

function displayMusicInfo() {
    musicImg.src = `${PLAYLIST[currentPlayerList].img}`
    musicName.innerText = `${PLAYLIST[currentPlayerList].name}`;
    artist.innerText = `${PLAYLIST[currentPlayerList].artist}`;
}

function onPlayerReady(event) {
    displayMusicInfo();
    handleLoadDurationTime();
}

function onPlayerStateChange(event) {
    if(event.data == YT.PlayerState.PLAYING) {
        handleLoadDurationTime();
        handleUpdateCurrentTime();
        timer = setInterval(handleUpdateCurrentTime, 1000); // 매 1초마다 재생시간 체크

    } else if(event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        clearInterval(timer);
    }
}


// 재생 및 일시정지
function handlePlayBtnClick() {
    const isMusicPaused = playPausedBtn.classList.contains(PAUSED_CLASSNAME);

    // play or paused
    if(isMusicPaused) {
        // 일시정지 상태라면
        playPausedBtn.classList.remove(PAUSED_CLASSNAME);
        playPausedBtn.setAttribute("title", "재생");
        playPausedBtnImg.src = 'images/icon/pause_icon.png';
        player.playVideo();     // 로드한 동영상 재생

    } else {
        // 재생 중이라면
        playPausedBtn.classList.add(PAUSED_CLASSNAME);
        playPausedBtn.setAttribute("title", "일시중지");
        playPausedBtnImg.src = 'images/icon/play_icon.png';
        player.pauseVideo();    // 일시중지
    }   
}

let currentPlayerList = 0;

// 이전 곡 재생
function handlePrevBtnClick() {
    if(currentPlayerList <= 0) {
        currentPlayerList = PLAYLIST.length-1;
    } else {
        currentPlayerList -= 1;
    }
    displayMusicInfo();
    player.loadVideoById(PLAYLIST[currentPlayerList].videoId);
    handlePlayBtnClick()
}

// 다음 곡 재생
function handleNextBtnClick() {
    if(currentPlayerList >= PLAYLIST.length-1) {
        currentPlayerList = 0;
    } else {
        currentPlayerList += 1;
    }
    displayMusicInfo();
    player.loadVideoById(PLAYLIST[currentPlayerList].videoId);  // 지정한 동영상 로드하고 재생
    handlePlayBtnClick()
    
    //console.log(player.playerInfo.duration); //undefined
}

playPausedBtn.addEventListener("click", handlePlayBtnClick);
prevBtn.addEventListener("click", handlePrevBtnClick);
nextBtn.addEventListener("click", handleNextBtnClick);