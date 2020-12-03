<template>
    <div class="home">
        <div class="heading">
            <h1>Tally: {{finalCount}}</h1>
        </div>
        <section class="image-gallery">
            <div class="image" v-for="d in dictionary" :key="d.id">
              <div>
                <h2>{{d.convo}}</h2>
                <h4>{{d.num}}</h4>
                </div>                 
            </div>
        </section>
    </div>
</template>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Niconne&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Castoro&display=swap');
h1 {
        font-family: 'Castoro', serif;
font-size: 60px;

}

h2 {
        font-family: 'Niconne', cursive;
font-size: 40px;
color: #fff;
background-color: #4C8577;
}

h4 {
    font-weight: bolder;
    color: #4C8577;
    font-size: 30px;
}

    .image p {
        font-style: italic;
    }

    .heading {
        color: #fff;
        background-color: #121420;
        text-align: center;
        padding: 20px;
    }

    /* Masonry */
    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    .image-gallery {
        column-gap: 1.5em;
        text-align: center;
    }

    .image {
        margin: 0 0 1.5em;
        margin-bottom: 100px;
        display: inline-block;
        width: 100%;
    }

    .image img {
        width: 100%;
    }

    /* Masonry on large screens */
    @media only screen and (min-width: 1024px) {
        .image-gallery {
            column-count: 3;
        }
    }

    /* Masonry on medium-sized screens */
    @media only screen and (max-width: 1023px) and (min-width: 768px) {
        .image-gallery {
            column-count: 2;
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
        name: 'Home',
        data() {
            return {
                items: [],
                convos: [],
                numbers: [],
                dictionary: [],
                showing: false,
                findconvo: "",
                findItem: null,
                finalCount: 0,
            }
        },
        created() {
            this.getItems();
            this.getConvo();
        },
        methods: {
            async getItems() {
                try {
                    let response = await axios.get("/api/items");
                    this.items = response.data;
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async getConvo() {
                try {
                    let uniqConvo = await this.getItems();
                    uniqConvo = [];
                    //loop through letters
                    for (let i = 0; i < this.items.length; i++) {
                        let temp;
                        const thisAuthor = this.items[i].author
                        const thisReceiver = this.items[i].receiver
                        //create ids
                        if (thisAuthor.slice(0, 2) >= thisReceiver.slice(0, 2)) {
                            temp = `${thisReceiver.slice(0,2)}-${thisAuthor.slice(0,2)}`
                        }
                        temp = `${thisAuthor.slice(0,2)}-${thisReceiver.slice(0,2)}`
                    
                        uniqConvo.push(temp)
                    }
                        //build dictionary
                        this.uniqConvo = uniqConvo.reduce((acc, val) => {
                            acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
                            return acc;
                        }, {});

                        console.log(uniqConvo)


                        // this.dictionary = {convo :this.convos, num :this.numbers}
                        this.convos = Object.keys(this.uniqConvo);
                        this.numbers = Object.values(this.uniqConvo);

                        for (let l = 0; l < uniqConvo.length; l++) {
                          this.dictionary.push({
                            convo: this.convos[l],
                            num: this.numbers[l],
                          })
                        }

                        this.finalCount = this.numbers.reduce(function (a,b) {
                            return a+b;
                        }, 0)
                        
                    }

                 catch (error) {
                    console.log(error);
                }
            },

            findConvo(first, second) {
                if (first.slice(0, 2) >= second.slice(0, 2)) {
                    return `${second.slice(0,2)}-${first.slice(0,2)}`
                }
                return `${first.slice(0,2)}-${second.slice(0,2)}`
            },

            findCounts(convo) {
                for (let i = 0; i < this.items.length; i++) {
                    let counter = 0;
                    let temp;
                    const thisAuthor = this.items[i].author
                    const thisReceiver = this.items[i].receiver

                    if (thisAuthor.slice(0, 2) >= thisReceiver.slice(0, 2)) {
                        temp = `${thisReceiver.slice(0,2)}-${thisAuthor.slice(0,2)}`
                    }
                    temp = `${thisAuthor.slice(0,2)}-${thisReceiver.slice(0,2)}`

                    if (temp === convo) {
                        counter++
                    }
                    return counter;
                }
            },
            fillDt(dateSent) {
                return `${dateSent.slice(5,10)}-${dateSent.slice(0,4)}`
            }
        }
    }
</script>