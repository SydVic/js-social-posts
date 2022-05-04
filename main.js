const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-05-27"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=154",
        "author": {
            "name": "April O'Neil",
            "image": "https://unsplash.it/300/300?image=31"
        },
        "likes": 15,
        "created": "2021-05-27"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=36",
        "author": {
            "name": "Stephan Erbert Staruss",
            "image": ""
        },
        "likes": 36,
        "created": "2021-05-27"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=58",
        "author": {
            "name": "Mike Dellavo",
            "image": "https://unsplash.it/300/300?image=82"
        },
        "likes": 125,
        "created": "2021-05-27"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=99",
        "author": {
            "name": "Gino Pino",
            "image": "https://unsplash.it/300/300?image=187"
        },
        "likes": 27,
        "created": "2021-05-27"
    },
];

// prelevo container dei post
const postContainer = document.getElementById("container");
//console.log("postContainer", postContainer);

posts.forEach(post => {
    const createdPost = createPostElement(post);

    postContainer.innerHTML += createdPost;
});

const likedPosts = [];
const likeButtons = document.querySelectorAll(".js-like-button");
//console.log("likeButtons", likeButtons);
likeButtons.forEach((button, index) => {
    button.addEventListener("click", function(event){
        event.preventDefault();

        const clickedPost = posts[index];
        const clickedPostId = clickedPost.id;
        const likeCounter = document.getElementById(`like-counter-${clickedPostId}`);
        let likesNumber = parseInt(likeCounter.textContent);

        if ( !likedPosts.includes(clickedPostId)) {

            this.classList.add("like-button--liked");
    
            likesNumber = likesNumber + 1;
            
            likedPosts.push(clickedPostId);
            
        } else {
            
            this.classList.remove("like-button--liked");
            
            likesNumber = likesNumber - 1;
            
            const idIndexInLikedPosts = likedPosts.indexOf(clickedPostId);
            likedPosts.splice(idIndexInLikedPosts, 1);
            
        }
        likeCounter.innerHTML = likesNumber;
        clickedPost.likes = likesNumber;
    });
});


// FUNCTION

/**
 * Description
 * @param {Object} postObject
 * @returns {String} return a DOM element in string form
 */
function createPostElement(postObject) {
    const {id, content, author, media, likes, created} = postObject;
    const postElement = `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        ${ (author.image) ? createAuthorImage(author) : CreatePlaceholderAutorImage(author.name) }               
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${formatDate(created)}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `;
    return postElement;
}


function formatDate(originalDate) {
    const originalDateArray = originalDate.split("-");
    const reversedDateArray = originalDateArray.reverse();
    const italianDateString = reversedDateArray.join("/");

    return italianDateString;
    //const italianDateString = originalDate.split("").reverse().join("/");
}


/**
 * Description
 * @returns {any}
 */
function createAuthorImage(authorObject) {
    const {image, name} = authorObject;
    const authorImage = `<img class="profile-pic" src="${image}" alt="${name}">`;

    return authorImage;
}


/**
 * Description
 * @returns {any}
 */
function CreatePlaceholderAutorImage(authorName) {
    const nameParts = authorName.split(" ");
    let initials = "";
    nameParts.forEach(name => {
        const firstLetter = name[0];
        initials += firstLetter;
    });

    const placeHolder = `
        <div class="profile-pic-default">
            <span>${initials}</span>
        </div>
    `;

    return placeHolder;
}