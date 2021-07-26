let isRunning = false
const runBtn = document.getElementById("run-btn")
const stopBtn = document.getElementById("stop-btn")
let postsToLike = 0
let timeBetweenLikes = 3;
const timeBetweenLikeEl = document.getElementById("input-el")
const toLikeEL = document.getElementById("posts-el")
let postsLiked = 0
const counterEl = document.getElementById("liked-el")

stopBtn.disabled =true

runBtn.addEventListener("click" , () => {
    isRunning = true
    stopBtn.disabled =false
    runBtn.disabled=true
    timeBetweenLikes = parseInt(timeBetweenLikeEl.value)
    postsToLike = parseInt(toLikeEL.value)

    setInterval(() => {
        if (postsToLike > 0){
            if (isRunning && postsLiked < postsToLike){
                updateLikedCounter()
                chrome.tabs.query({"active" : true} , (tabs) => {
                    let tab = tabs[0]
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        function: likePost
                    })
                })
            }
            else if (postsLiked >= postsToLike){
                stopBtn.click()
            }
        }
        else{
            if (isRunning){
                updateLikedCounter()
                chrome.tabs.query({"active" : true} , (tabs) => {
                    let tab = tabs[0]
                    chrome.scripting.executeScript({
                        target: {tabId: tab.id},
                        function: likePost
                    })
                })
            }
        }
    },timeBetweenLikes*1000)
})

stopBtn.addEventListener("click" , () => {
    isRunning = false
    postsLiked = 0
    stopBtn.disabled =true
    runBtn.disabled=false
})

const likePost = () => {
    const likeBtn = document.getElementsByClassName("wpO6b  ")
    const arrowBtn = document.querySelector(".coreSpriteRightPaginationArrow")
    likeBtn[1].click()
    arrowBtn.click()
}

const updateLikedCounter = () =>{
    postsLiked += 1
    counterEl.textContent = "Posts Liked: "+JSON.stringify(postsLiked)
}
