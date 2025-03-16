let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'images/nangeallava.png',
        name : 'Nange Allava',
        artist : 'Sanjith Hegde',
        music : 'music/song1.mp3'
    },
    {
        img : 'images/co2.png',
        name : 'Co2',
        artist : 'Prateek Kuhad',
        music : 'music/song4.mp3'
    },
    {
        img : 'images/jotum.png',
        name : 'Jo Tum Mere Ho',
        artist : 'Anuv Jain',
        music : 'music/song2.mp3'
    },
    {
        img : 'images/taazasamachara.png',
        name : 'Taaza Samachara',
        artist : 'D Imman',
        music : 'music/song5.mp3'
    },
    {
        img : 'images/beyours.png',
        name : 'I Wanna Be Yours',
        artist : 'Arctic Monkeys',
        music : 'music/song6.mp3'
    },
    {
        img : 'images/pehle.png',
        name : 'Pehle Bhi Main',
        artist : 'Vishal Mishra',
        music : 'music/song3.mp3'
    }
];

const bubbleImages = [
    'images/bubble1.jpg',
    'images/bubble2.jpg',
    'images/bubble3.jpg',
    'images/bubble4.jpg',
    'images/bubble5.jpg',
    'images/bubble6.jpg',
    'images/bubble7.jpg',
    'images/bubble8.jpg',
    'images/bubble10.jpg',
    'images/bubble11.jpg',
    'images/bubble12.jpg',
    'images/bubble13.jpg',
    'images/bubble14.jpg',
    'images/bubble15.jpg',
    'images/bubble16.jpg',
    'images/bubble17.jpg',
    'images/bubble18.jpg',
    'images/bubble19.jpg',
    'images/bubble20.jpg',
    'images/bubble21.jpg',
    'images/bubble22.jpg',
    'images/bubble23.png',
    'images/bubble24.png',
    'images/bubble25.png',
    'images/bubble26.png',
    'images/bubble27.png',
    'images/bubble28.png',
    'images/bubble29.png',
    'images/bubble30.png',
    'images/bubble31.png',
    'images/bubble32.png',
    'images/bubble33.png',
    'images/bubble34.png',
    'images/bubble35.png',
    'images/bubble36.png',
    'images/bubble37.png',
    'images/bubble38.png',
    'images/bubble39.png',
    'images/bubble40.png',
    'images/bubble41.png',
];

function assignBubbleImages() {
    const bubbles = document.querySelectorAll('.bubble');
    const shuffledImages = bubbleImages.sort(() => 0.5 - Math.random());
    bubbles.forEach((bubble, index) => {
        const randomLeft = Math.floor(Math.random() * 90) + '%';
        const randomDuration = Math.floor(Math.random() * 20) + 15 + 's';
        const randomDelay = Math.floor(Math.random() * 10) + 's';
        
        bubble.style.backgroundImage = `url(${shuffledImages[index]})`;
        bubble.style.left = randomLeft;
        bubble.style.animationDuration = randomDuration;
        bubble.style.animationDelay = randomDelay;
    });
}

document.addEventListener('DOMContentLoaded', assignBubbleImages);

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}
