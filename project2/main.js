let tweetArea = document.getElementById("tweetArea")
let MAX_LETTER = 140





// The user should be able to press "Tweet" and see the message pop in below the text box. —> create to do list.

let tweetPosted = [];

let postTweet = () => {
    let userType = document.getElementById("tweetArea").value
    let keyword = userType.split(' ')
    let hashTag = ""
    for (let i=0; i<keyword.length; i++){
       if ( keyword[i].startsWith('#')){
        hashTag = keyword[i];
       }
    }

    let createdTweet = {
        name: "",
        username: "",
        content: userType,
        time: "",
        id: Date.now(),
        image: "",
        hashtag: `${hashTag}`,
        isNormalTweet: true,
        isLiked: false,
        retweetObject: null

    }

    console.log(createdTweet);
    tweetPosted.unshift(createdTweet)
    showPost(tweetPosted)
    document.getElementById("tweetArea").value = ""
    document.getElementById("remainCharacter").innerHTML = "140 chatacters left"

}

// for (i=0; 

let findHashtag = () =>{
    let keyword = userType.split(' ')
}

let hashTag = (index) =>{
    let hashtaglist = tweetPosted.filter(item => item.hashtag ==  tweetPosted[index].hashtag)
    showPost(hashtaglist)
}



let showPost = (list) => {
    let messsage = list.map((tweet,index) => {
        let hashtagHtml = ""
        if (tweet.hashtag == ""){
            hashtagHtml = ``
        } else {
            hashtagHtml = `<a href="#" onclick="hashTag(${index})">${tweet.hashtag}</a>`
        }
        let btnLikedHtml = ""
        if(tweet.isLiked == true){
            btnLikedHtml = `<button onclick="likeTweet(${index})"><i class="fas fa-heart btn-custom"></i></button>`

        } else {
            btnLikedHtml = `<button onclick="likeTweet(${index})"><i class="fas fa-heart"></i></button>`
        }

        if(tweet.isNormalTweet == true){ 
            return `<div id="contentArea">
        <div class="col-2"><img id="userAvatar" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/socialmedia/apple/237/eyes_1f440.png" alt="" srcset="" width=80></div>
        <div class="col-3">
            <div class="row">
                <div id="name">${tweet.name}</div>
                <div id="username">${tweet.username}</div>
                <div id="time">${tweet.time}</div>
        </div>
            <div class="row">
                <div class="description">${tweet.content}</div>
                ${hashtagHtml}
                
            </div>
            <div>
                <button>Comment</button>
                ${btnLikedHtml}
                <button href="" onclick="reTweet(${index})">Retweet</button>
                <button onclick="deleteTweet(${index})">Delete</button>


            </div>
          
        </div>
    </div>`

        } else {
            return  [
                `<div id="contentArea">
        <div class="col-2"><img id="userAvatar" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/socialmedia/apple/237/eyes_1f440.png" alt="" srcset="" width=80></div>
        <div class="col-3">
            <div class="row">
                <div id="name">${tweet.name}</div>
                <div id="username">${tweet.username}</div>
                <div id="time">${tweet.time}</div>
        </div>
            <div class="row">
                <div class="description">${tweet.content}</div>
                
            </div>
            <div>
                <button>Comment</button>
                <button onclick="likeTweet(${index})"><i class="fas fa-heart"></i></button>
                <button href="" onclick="reTweet(${index})">Retweet</button>
                <button onclick="deleteTweet(${index})">Delete</button>


            </div>
          
        </div>
    </div>`,    `<div id="contentArea">
    <div class="col-2"><img id="userAvatar" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/socialmedia/apple/237/eyes_1f440.png" alt="" srcset="" width=80></div>
    <div class="col-3">
        <div class="row">
            <div id="name">${tweet.retweetObject.name}</div>
            <div id="username">${tweet.retweetObject.username}</div>
            <div id="time">${tweet.retweetObject.time}</div>
    </div>
        <div class="row">
            <div class="description">${tweet.retweetObject.content}</div>
            
        </div>

    </div>
</div>` 
            ].join('')
          
         }
        
    }).join('')
    

document.getElementById("contentArea").innerHTML = messsage

}

let reTweet = (index) =>{
    let repost = prompt("what do you think about this Tweet?")
    
    let createdTweet = {
        name: "",
        username: "",
        content: repost,
        time: "",
        image: "",
        hashtag: [],
        id: Date.now(),
        isNormalTweet: false,
        isLiked: false,
        retweetObject: tweetPosted[index]

    }
    console.log(createdTweet);
    tweetPosted.unshift(createdTweet)
    showPost(tweetPosted)
    // document.getElementById("tweetArea").value = ""
    document.getElementById("remainCharacter").innerHTML = "140 chatacters left"
}




let countLetter = () => {
    console.log("type here")
    // get the length of sentence you'll type 
    let postLength = tweetArea.value.length
    console.log("length is", postLength)
    // MAX_LETTER - length
    // show the remain number
    let remainLength = MAX_LETTER - postLength

    if (remainLength <= 0) {
        document.getElementById("remainCharacter").innerHTML = `${remainLength} characters left`
        document.getElementById("remainCharacter").style.color = 'red'
    } else {
        document.getElementById("remainCharacter").innerHTML = `${remainLength} characters left`
        document.getElementById("remainCharacter").style.color = 'black'

    }



}
tweetArea.addEventListener("input", countLetter)

function likeTweet(index){
    tweetPosted[index].isLiked = ! tweetPosted[index].isLiked
    console.log("the tweet is liked")
    showPost(tweetPosted)

}


function deleteTweet(index) {

let myPost = tweetPosted[index];
console.log("dete " + myPost.id);
// xoa bai viet cua minh --> nguon
tweetPosted.splice(index,1);

// tim ai retweet 
let tobeleted = tweetPosted.filter(item => {
    console.log(item);
   return item.retweetObject != null && (item.retweetObject.id == myPost.id);
})
    
let tobekept = tweetPosted.filter(x => isNotItemInTheList(x, tobeleted))
console.log(tobekept);
tweetPosted = tobekept;

//xoa retweet


showPost(tweetPosted)
}

function isNotItemInTheList(item, list) {
    return list.filter(x => x.id == item.id).length == 0
}
// xoa bai viet cua minh --> nguon
//

// tim ai retweet 
// tweetPosted.filter(item => item.retweetObject == tweetPosted.)

// bai viet retweet chua cai minh --> delete luon.
// show Post(tweetPosted)t