/*Ricreiamo un feed social aggiungendo al layout dello starter kit di base fornito, il nostro script JS in cui:

Milestone 1
Creiamo il nostro array di oggetti che rappresentano ciascun post.
Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
id del post, numero progressivo da 1 a n
-nome autore,
-foto autore,
-data in formato americano (mm-gg-yyyy),
-testo del post,
-immagine (non tutti i post devono avere una immagine),
-numero di likes.
Non è necessario creare date casuali
Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)

BONUS
Formattare le date in formato italiano (gg/mm/aaaa)
Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

Nota (bonus extra) - super opzionale:
Poiché é la parte logica ad interessarci in questa fase del corso, nello starter kit c'é il markup che potete usare per svolgere l'esercizio.
Se finite la parte logica ed i vari bonus e vi avanza tempo per giocare un pó, pensate pure ad un layout differente e lavorateci su come bonus extra.
*/

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
        "created": "2021-06-25",
        classLike: ''
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03",
        classLike: ''
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15",
        classLike: ''
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03",
        classLike: ''
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05",
        classLike: ''
    }
];

let containerEl = document.querySelector('#container');

let idArray = [];


/*
Milestone 2
Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
*/

//invoco la funzione per generare i post (e incrocio le dita)
generateMarkupPost(posts);


/* 
Milestone 3
Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
*/

let likeBtn = document.querySelectorAll('.like-button'); //!!!qSA restituisce un array!!!
console.log(likeBtn);

generateLikeBtn(likeBtn);

/*######################## FUNCTIONS ########################*/

//Creo funzione per generare il markup
function generateMarkupPost(posts) {

    //svuoto pagina prima di ricreare il markup
    containerEl.innerHTML = '';

    posts.forEach(post => {

        /* TODO post-meta__time */

        const postMarkup =
            `<div id="${post.id}" class="post">
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">
                        <img class="profile-pic"
                            src="${post.author.image}"
                            alt="${post.author.name}">
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${post.author.name}</div>
                        <div class="post-meta__time">4 mesi fa</div>
                    </div>
                </div>
            </div>
            <div class="post__text">${post.content}</div>
            <div class="post__image">
                <img src="${post.media}" alt>
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button ${post.classLike}" href="javascript:;"
                            data-postid="${post.id}">
                            <i class="like-button__icon fas fa-thumbs-up"
                                aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-1"
                            class="js-likes-counter">${post.likes}</b> persone
                    </div>
                </div>
            </div>
        </div>`

        //aggiungo il markup
        containerEl.insertAdjacentHTML('beforeend', postMarkup);

    });

};

function generateLikeBtn(likeBtn) {

    likeBtn.forEach(btn => {

        btn.addEventListener("click", (e) => {

            //se non contiene .like-button--liked
            if (!btn.classList.contains('like-button--liked')) {

                //devo dirgli a quale post interessarsi (id)
                const postId = btn.getAttribute('data-postid');
                console.log(postId);

                for (const key in posts) {

                    //se sono uguali
                    if (posts[key]['id'] == postId) {

                        //pusha id in idArray
                        idArray.push(postId);
                        console.log(idArray);

                        //incremento di 1 il valore di likes 
                        posts[key]['likes']++;

                        //aggiungo .like-button--liked a likeClass
                        posts[key]['classLike'] = 'like-button--liked';
                        console.log(btn);
                        console.log(posts[key]['likes']);

                        //rigenero il markup aggiornato
                        generateMarkupPost(posts);
                        let likeBtn = document.querySelectorAll('.like-button');
                        generateLikeBtn(likeBtn);
                    }
                }

                //se contiene .like-button--liked
            } else if (btn.classList.contains('like-button--liked')) {

                //id post
                const postId = btn.getAttribute('data-postid');
                console.log(postId);

                for (const key in posts) {

                    //se sono uguali
                    if (posts[key]['id'] == postId) {

                        //filtro da idArray i valori diversi da postId
                        const filteredIds = idArray.filter(id => { return id != postId });

                        //decremento di 1 il valore di likes 
                        posts[key]['likes']--;

                        //rimuovo .like-button--liked a likeClass
                        posts[key]['classLike'] = '';
                        console.log(btn);
                        console.log(posts[key]['likes']);

                        //rigenero il markup aggiornato
                        generateMarkupPost(posts);
                        let likeBtn = document.querySelectorAll('.like-button');
                        generateLikeBtn(likeBtn);
                    }

                }
            }

        });
    });
};