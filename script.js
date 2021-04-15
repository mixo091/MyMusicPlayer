const musicContainer = document.querySelector('.music-container')
const PlayButton= document.querySelector('#play')
const PrevButton = document.querySelector('#prev')
const NextButton = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover =document.querySelector('#cover')

//songs 
const songs = ['AfterHours','CallOutMyName','ChicagoFreestyle',
'ComeHome','Crash&Burn','Eazy','FromTime','GotItOnMe','IMeanIt','Lovely','MeMyself&I'
,'Moana','TeenageFever' ]

let songIndex=0;

loadSong(songs[songIndex])
function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src= `images/${song}.jpg`
}

function Play(){
    musicContainer.classList.add('play')
    PlayButton.querySelector('i.fas').classList.remove('fa-play')
    PlayButton.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
  
}

function Pause(){
    musicContainer.classList.remove('play')
    PlayButton.querySelector('i.fas').classList.add('fa-play')
    PlayButton.querySelector('i.fas').classList.remove('fa-pause')   
    audio.pause()
}

//events 
PlayButton.addEventListener('click',()=> {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying){
        Pause()
    }else{
        Play()
    }
})



function prevSong(){

    songIndex--;
    if(songIndex<0){
        songIndex =songs.length -1 
    }

    loadSong(songs[songIndex])
    Play()
}


function nextSong(){
    songIndex++;
    if(songIndex>=songs.length){
        songIndex =0; 
    }
    loadSong(songs[songIndex])
    Play()
}

function updateProgress(event){
    const {duration,currentTime}= event.srcElement
    const progressPer= (currentTime/duration)*100
    progress.style.width=`${progressPer}%`
}

function SetProgress(event){

    const width = this.clientWidth
    const clickX=event.offsetX
    const duration= audio.duration
    audio.currentTime = (clickX /width ) *duration
}

//Go to the song before
PrevButton.addEventListener('click',prevSong)
//Go to the next Song
NextButton.addEventListener('click',nextSong)
//progressBar
audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',SetProgress)