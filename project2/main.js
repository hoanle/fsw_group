const apiKey = "5c190d4725c64a88adea3e08c5e21ba3"

let yourName = prompt("your name? ");

let tagSearch;
let input;
let count;
let btnTweet;
let tweetList = [];

let currentUser =  {
    id: 1,
    name: yourName.replace(" ", "")
}

const loadNews = async () => {
    let data = await fetch("https://community-open-weather-map.p.rapidapi.com/weather?q=Ho%20chi%20minh", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "de32386cffmsh305d0840ae27f2cp15e84djsn9587fa3d12b0"
        }
    });
    let result = await data.json();
    console.log(result);
    renderWeather(result);
}

const renderWeather = (weather) => {
    document.getElementById("country").innerHTML = "Viet Nam";
    document.getElementById("city").innerHTML = weather.name;
    document.getElementById("sunrise").innerHTML = `Sunrise: ${today.unix(weather.sys.sunrise).format('hh:mm A')}`;
    document.getElementById("sunset").innerHTML = `Sunset: ${today.unix(weather.sys.sunset).format('hh:mm A')}`;
    document.getElementById("weather").innerHTML = `${weather.weather[0].main}: ${weather.weather[0].description}`;
    document.getElementById("temp").innerHTML = `Temperature: ${weather.main.temp}ºF`;
    document.getElementById("feel-like").innerHTML = `Feel-like: ${weather.main.feels_like}ºF`;
    document.getElementById("pressure").innerHTML = `Pressure: ${weather.main.pressure}`;
    document.getElementById("humidity").innerHTML = `Humidity: ${weather.main.humidity}`;
    document.getElementById("wind_speed").innerHTML = `Wind speed: ${weather.wind.speed}`;
}

//loadNews()


const postATweet = () => {
    let content = document.getElementById('tweet-input').value;
    let split = content.split(" ");
    let tags = split.filter(x => x.startsWith("#"));
    let mentions = split.filter(x => x.startsWith("@"));
    let images = split.filter(x => {
        return (x.endsWith("png") || x.endsWith("jpg") 
        || x.endsWith("jpeg") || x.endsWith("PNG") 
        || x.endsWith("JPEG") || x.endsWith("JPG"));
    })

    console.log(tags);
    let time = Date.now();
    let image = "";

    if (images.length > 0) {
        image = images[0];
    }

    let tweetToPost = {
        author: currentUser,
        time: time,
        content: content.replace(image, ""),
        tags: tags,
        mentions: mentions,
        id: time, 
        source: {
            id: null, 
            tweet: null
        }, 
        liked: false,
        image: image
    }

    console.log(tweetToPost);

    tweetList.push(tweetToPost);

    render(tweetList);

    input.value = "";
};

const render = (list) => {
    let container = document.getElementById("tweet-list-container");
    
    let html = list.map(x => {
        
        let likeHtml = "";
        let image = "";

        if (x.liked) {
            likeHtml = `<div onclick="like(${x.id})" class="tweet-item-action liked"><i class="fas fa-heart"></i></i></div>`
        } else {
            likeHtml = `<div onclick="like(${x.id})" class="tweet-item-action"><i class="far fa-heart"></i></div>`
        }

        let deleleteHtml = "";
        
        deleleteHtml = `<div onclick="deleteTweet(${x.id})" class="tweet-item-action"><i class="far fa-trash-alt"></i></i></div>`

        if (x.source.id != null && x.source.tweet != null) {
            let tempContent = x.source.tweet.content;

            x.source.tweet.tags.map(t => {
                console.log("tag " + t);
                let tempT = t.replace("#", "")
                tempContent = tempContent.replace(t, `&nbsp;<div class="tag-text" onclick="clickTag(${tempT})">${t}</div>&nbsp;`)
            })

            x.source.tweet.mentions.map(m => {
                console.log("tag " + m);
                let tempM = t.replace("@", "")
                tempContent = tempContent.replace(m, `&nbsp;<div class="tag-text" onclick="clickName(${tempM})">${m}</div>&nbsp;`)
            })
            
            if (x.source.tweet.image != "") {
                image = `<img src="${x.source.tweet.image}" width="100" height="100" />`
            }

            let itemHtml = 
            `<div class="row tweet-item-container">
                <div class="col-2">
                    <i class="fas fa-user-circle user-avatar"></i>
                </div>
                <div class="col-10">
                    <div class="row padding-top-bottom">You Retweeted</div>
                    <div class="row padding-top-bottom">
                        <div class="user-name">${x.source.tweet.author.name}</div>
                        <i class="fas fa-shopping-bag"></i>
                        <div class="tweet-date">${x.source.tweet.time}</div>
                    </div>
                    <div class="row padding-top-bottom">
                        ${tempContent}
                    </div>
                    ${image}
                    <div class="row class tweet-actions">
                        <div onclick="comment(${x.id})" class="tweet-item-action"><i class="far fa-comment"></i></div>
                        <div onclick="reweet(${x.id})" class="tweet-item-action"><i class="fas fa-retweet"></i></div>
                        ${likeHtml}
                        ${deleleteHtml}
                    </div>
                </div>
            </div>`
        return itemHtml;
        } else {
            let tempContent = x.content;
            x.tags.map(t => {
                console.log("tag " + t);
                let tempT = t.replace("#", "")
                tempContent = tempContent.replace(t, `&nbsp;<div class="tag-text" onclick="clickTag(${tempT})">${t}</div>&nbsp;`)
            })

            x.mentions.map(m => {
                console.log("tag " + m);
                let tempM = m.replace("@", "")
                tempContent = tempContent.replace(m, `&nbsp;<div class="tag-text" onclick="clickName(${tempM})">${m}</div>&nbsp;`)
            })

            if (x.image != "") {
                image = `<img src="${x.image}" width="100" height="100" />`
            }

            let itemHtml = 
            `<div class="row tweet-item-container">
                <div class="col-2">
                    <i class="fas fa-user-circle user-avatar"></i>
                </div>
                <div class="col-10">
                    <div class="row padding-top-bottom">
                        <div class="user-name">${x.author.name}</div>
                        <i class="fas fa-shopping-bag"></i>
                        <div class="tweet-date">${x.time}</div>
                    </div>
                    <div class="row padding-top-bottom">
                        ${tempContent}
                    </div>
                    ${image}
                    <div class="row class tweet-actions">
                        <div onclick="comment(${x.id})" class="tweet-item-action"><i class="far fa-comment"></i></div>
                        <div onclick="reweet(${x.id})" class="tweet-item-action"><i class="fas fa-retweet"></i></div>
                        ${likeHtml}
                        ${deleleteHtml}
                    </div>
                </div>
            </div>`
            return itemHtml;
        }
        
    }).join('');

    container.innerHTML = html;
    
}


const comment = (id) => {
    console.log(reweet);
}

const reweet = (id) => {
    let currentTweet = tweetList.filter(x => x.id == id);
    
    let copy = {...currentTweet[0]}
    copy.liked = false;
    let time = Date.now();

    let tweetToPost = {
        author: currentUser,
        time: time,
        content: "",
        tags: [],
        mentions: [],
        id: time, 
        source: {
            id: id, 
            tweet: copy
        }, 
        liked: false, 
        images: []
    }

    tweetList.unshift(tweetToPost);
    render(tweetList);
}

const like = (id) => {
    tweetList.map((x, index) => {
        if (x.id == id) {
            tweetList[index].liked = !tweetList[index].liked
        }
    });
    render(tweetList);
}


const deleteTweet = (id) => {
    let toBeKept = tweetList.filter(x => {
        if (x.source.id != null && x.source.tweet != null) {
            return (x.source.id != id && x.id != id) 
        } else {
            return x.id != id;
        }
    });
    tweetList = toBeKept;
    render(tweetList);
}

const filterTweet = (value) => {
    console.log("filterTweet " + value);
    if (value.startsWith("#")) {
        let filteredList = tweetList.filter(tweet => {
            return tweet.tags.filter(tag => {
                console.log("tag " + tag + " - value "+ value);
                return tag.toLowerCase() == value.toLowerCase()
            }).length > 0;
        })
        render(filteredList);
    } else {
        let filteredList = tweetList.filter(tweet => {
            return tweet.content.includes(value) 
        })
        render(filteredList);
    }
}


const clickTag = (tag) => {
    console.log("click tag " + tag);
    document.getElementById("tag-search").value = `#${tag}`;
    filterTweet(`#${tag}`);
}

document.addEventListener('DOMContentLoaded',function(event){
    input = document.getElementById("tweet-input");
    btnTweet = document.getElementById("button-tweet");
    count = document.getElementById("count");
    tagSearch = document.getElementById("tag-search");

    input.addEventListener("input", function() {
        let value = input.value;

        if (value.length > 0) {
            btnTweet.disabled = false;
        } else {
            btnTweet.disabled = true;
        }
        
        count.innerHTML = `${140-value.length} characters left.`;
        if (value.length < 140) {
            count.style.color = 'dimgrey'
        } else {
            count.style.color = 'red'
        }

    });

    btnTweet.addEventListener("click", postATweet)

    tagSearch.addEventListener("input", function() {
        let value = tagSearch.value;
        console.log("tagSearch input " + value);
        if (value.length > 2) {
            filterTweet(value)
        } else {
            render(tweetList);
        }
    });
});

