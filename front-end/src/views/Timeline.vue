<template>
    <div class="timeline container">
        <section class="thin">
            <div class="wrap">
                <div class="search">

                    <input type="text" v-model="findconvo" class="searchTerm" placeholder="Search">

                </div>
            </div>
            <div class="suggestions">
            <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="fillLetter(s.text, s.author)"><strong>{{fillBtn(s.author, s.receiver)}}</strong> : {{fillDt(s.dateSent)}}</div>
            </div>
            <!-- <div class="" v-for="item in items" :key="item.id">
        <button @click="fillLetter(item.p1, item.p2, item.p3, item.p4, item.p5, item.p6, item.p7, item.p8, item.author)"><strong>{{fillBtn(item.author, item.receiver, item.dateSent)}}</strong><i>{{fillDt(item.dateSent)}}</i></button>
      </div> -->
        </section>
        <div class="column">
            <div class="paragraphs" v-for="p in paragraphs" :key="p.id">
                <div class="par">{{p}}</div>
            </div>
            <div></div>
        </div>
    </div>
</template>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Open+Sans);
    @import url('https://fonts.googleapis.com/css2?family=Niconne&display=swap');

    /* searchbar */
    .search {
        width: 100%;
        position: relative;
        display: flex;
        padding-bottom: 10px;
    }

    .searchTerm {
        width: 100%;
        border: 3px solid #4C8577;
        padding: 5px;
        height: 20px;
        border-radius: 5px 0 0 5px;
        outline: none;
        color: #9DBFAF;
    }

    .searchTerm:focus {
        color: #4C8577;
    }


    /*Resize the wrap to see the search bar change!*/
    .wrap {
        width: 100%;
        top: 50%;
        left: 50%;
    }

    .column {
        margin-left: 60px;
        margin-top: 40px;
        flex-grow: 4;
        flex-basis: 500px;
        font-family: 'Niconne', cursive;
        font-size: 24px;
        max-width: 60%;
    }

    .thin {
        flex-basis: 20%;
        margin-right: 15px;
        min-width: 20%;
    }


    button {
        width: 200px;
    }

    .image p {
        font-style: italic;
    }

    .container {
        display: flex;
        justify-content: flex-start;
        align-items: right;
        align-content: flex-start;
    }

    .paragraphs {
        margin-bottom: 30px;
    }

    /* Masonry */
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    .image-gallery {
        column-gap: 1.5em;
    }

    .image {
        margin: 0 0 1.5em;
        display: inline-block;
        width: 100%;
    }

    .image img {
        width: 100%;
    }

    /* Suggestions */
    .suggestions {
        min-height: 800px;
    }

    .suggestion {
        min-height: 20px;
        width: 100%;
        text-align: left;
        padding-left: 5px;
    }

    .suggestion:hover {
        background-color: #4C8577;
        color: #fff;
    }

    /* Masonry on large screens */
    @media only screen and (min-width: 1024px) {
        .image-gallery {
            column-count: 4;
        }
    }

    /* Masonry on medium-sized screens */
    @media only screen and (max-width: 1023px) and (min-width: 768px) {
        .image-gallery {
            column-count: 3;
        }
    }

    /* Masonry on small screens */
    @media only screen and (max-width: 767px) and (min-width: 540px) {
        .image-gallery {
            column-count: 2;
        }
    }
</style>

<script>
    // @ is an alias to /src
    import axios from 'axios';
    export default {
        name: 'Timeline',
        data() {
            return {
                items: [],
                paragraphs: [],
                letterText: '',
                author: '',
                btnText: '',
                showing: false,
                findconvo: "",
                findItem: null,
            }
        },
        computed: {
            suggestions() {
                let items = this.items.filter(item => item.author.toLowerCase().startsWith(this.findconvo.toLowerCase()) || item.receiver.toLowerCase().startsWith(this.findconvo.toLowerCase()))
                return items.sort((a, b) => a.author > b.author);
            }
        },
        created() {
            this.getItems();
        },
        methods: {
            selectItem(item) {
                this.findauthor = "";
                this.findItem = item;
            },
            async getItems() {
                try {
                    let response = await axios.get("/api/items");
                    this.items = response.data;
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            fillLetter(text, author) {
                let check = text
                //   console.log(check);
                let n = 0
                let checkArray = []
                do {
                    n = check.indexOf("\n")
                    //   console.log(`n = ${n}`);
                    checkArray.push(check.slice(0, n))
                    check = check.slice(n + 1)
                }
                //   console.log(`check is: ${check}`);}
                while (n != -1)
                //   checkArray.push(check)
                for (let j = 0; j < checkArray.length; j++) {
                    console.log(`array at ${j} is ${checkArray[j]}`)
                }
                //   console.log(`array is: ${checkArray.length}`)
                this.paragraphs = checkArray;
                this.paragraphs.pop();
                this.paragraphs.push(author)
            },
            toggle() {
                if (this.showing === true) {
                    this.showing = false
                } else {
                    this.showing = true
                }
            },
            findConvo(first, second) {
                if (first.slice(0, 2) >= second.slice(0, 2)) {
                    return `${second.slice(0,2)}-${first.slice(0,2)}`
                }
                return `${first.slice(0,2)}-${second.slice(0,2)}`
            },
            fillBtn(first, second) {
                // let counter = 0;
                let conversation = this.findConvo(first, second)
                // console.log(conversation);
                // for (let i = 0; i < this.items.length; i++) {
                //     const thisAuthor = this.items[i].author
                //     const thisReceiver = this.items[i].receiver
                //     const arrayConversation = this.findConvo(thisAuthor, thisReceiver)
                // }
                // console.log(conversation);
                return conversation;
            },
            fillDt(dateSent) {
                return `${dateSent.slice(5,10)}`
            }
        },
    }
</script>