<template>
    <div class="admin">
        <h1>Admin</h1>
        <container class="container">
            <div class="column">
                <div class="heading">
                    <div class="circle">1</div>
                    <h2>Add an Item</h2>
                </div>
                <div class="add">
                    <div class="form">
                        <!-- <input v-model="author" placeholder="From"> -->
                        <select v-model="author">
                            <option disabled value="">From</option>
                            <option v-for="c in characters" :key="c.id">{{c}}</option>

                        </select>
                        <p></p>
                        <select v-model="receiver">
                            <option disabled value="">To</option>
                            <option v-for="c in characters" :key="c.id">{{c}}</option>

                        </select>
                        <p></p>
                        
                        <input v-model="dateSent" placeholder="5/6/730">
                        <p></p>
                        <textarea v-model="tag" placeholder="Letter summary..."></textarea>
                        <p></p>
                        <textarea v-model="text" placeholder="letter body..."></textarea>
                        <p></p>
                        
                        <!-- <input type="file" name="doc" @change="fileChanged"> -->
                        <button @click="upload">Upload</button>
                    </div>
                </div>
                <div class="upload" v-if="addItem">
                    <h2>{{addItem.author}}</h2>
                    <h2>{{addItem.receiver}}</h2>
                    <h2>{{addItem.dateSent}}</h2>
                    <h2>{{addItem.tag}}</h2>
                    <h2>{{addItem.text}}</h2>
                </div>
            </div>
            <div class="column">
                <div class="heading">
                    <div class="circle">2</div>
                    <h2>Edit/Delete an Item</h2>
                </div>

                <div class="edit">
                    <div class="form">
                        <input class="search" v-model="findauthor" placeholder="Search">
                        <div class="suggestions" v-if="suggestions.length > 0">
                            <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.author}}
                            </div>
                        </div>
                    </div>

                    <div class="actions editDelete" v-if="findItem">
                        <button class="btnEdit" @click="deleteItem(findItem)">Delete</button>
                        <button class="btnEdit" @click="editItem(findItem)">Edit</button>
                    </div>

                    <div class="upload" v-if="findItem">
                        <select v-model="findItem.author">
                            <option disabled value="">To</option>
                            <option v-for="c in characters" :key="c.id">{{c}}</option>

                        </select>
                        <p></p>
                        <select v-model="findItem.receiver">
                            <option disabled value="">To</option>
                            <option v-for="c in characters" :key="c.id">{{c}}</option>

                        </select>
                        <p></p>
                        <input v-model="findItem.dateSent" placeholder="date">
                        <p></p>
                        <textarea v-model="findItem.tag" placeholder="Letter summary..."></textarea>
                        <p></p>
                        <p></p>
                        <textarea v-model="findItem.text" placeholder="Letter body..."></textarea>
                        <p></p>
                        
                    </div>
                </div>
            </div>
        </container>
    </div>
</template>

<style scoped>
    button {
        padding: 10px;
        background-color: #4C8577;
        color: white;
        width: 100px;
    }

    container {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        align-content: flex-start;
    }

    .editDelete {
        display: relative;
        text-align: center;
    }

    .btnEdit {
        margin-bottom: 10px;
        margin-top: 10px;
        margin-right: 20px;
        margin-left: -30px;
        text-align: center;
        width: 100px;
    }

    input,
    textarea {
        padding: 5px;
    }

    textarea:focus, input:focus {
        border-color: #4C8577
    }

    .column {
        flex-basis: 40%;
    }

    .image h2 {
        font-style: italic;
        font-size: 1em;
    }

    .heading {
        display: flex;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    .heading h2 {
        margin-top: 8px;
        margin-left: 10px;
        font-size: 16px;
    }

    .add,
    .edit {
        display: flex;
    }

    .circle {
        border-radius: 50%;
        width: 18px;
        height: 18px;
        padding: 8px;
        background: #4C8577;
        color: #fff;
        text-align: center
    }

    /* Form */
    input,
    textarea,
    select,
    button {
        font-family: 'Montserrat', sans-serif;
        font-size: 1em;
    }

    .form {
        margin-right: 50px;
    }

    /* Uploaded images */
    .upload h2 {
        margin: 0px;
    }

    .upload img {
        max-width: 300px;
    }

    /* Suggestions */
    .suggestions {
        width: 210px;
        padding-top: 5px;
        /* border: 1px solid #ccc; */
    }

    .search {
        width: 200px;
    }

    .suggestion {
        min-height: 20px;
        padding-left: 5px;
    }

    .suggestion:hover {
        background-color: #4C8577;
        color: #fff;
    }
</style>

<script>
    import axios from 'axios';
    export default {
        name: 'Admin',
        data() {
            return {
                author: "",
                receiver: "",
                dateSent: "",
                tag: "",
                text: "",
                // id: "",
                // file: null,
                addItem: null,
                items: [],
                characters: ["Aenna", "Davian", "Sura", "Torin", "Vurmira", "Zephyra", "Niera", "Idin", "Drotan", "Skeigi", "Ravvi"],
                findauthor: "",
                findItem: null,
            }
        },
        computed: {
            suggestions() {
                let items = this.items.filter(item => item.author.toLowerCase().startsWith(this.findauthor.toLowerCase()));
                return items.sort((a, b) => a.author > b.author);
            }
        },
        created() {
            this.getItems();
        },
        methods: {

            fileChanged(event) {
                this.file = event.target.files[0]
            },
            async upload() {

                try {
                    const formData = new FormData();
                    formData.append('author', this.author)
                    formData.append('receiver', this.receiver)
                    formData.append('dateSent', this.dateSent)
                    formData.append('tag', this.tag)
                    formData.append('text', this.text)
                    

                    let r1 = await axios.post('/api/items', {
                        author: this.author,
                        receiver: this.receiver,
                        dateSent: this.dateSent,
                        tag: this.tag,
                        text: this.text,
                        
                    });
                    this.addItem = r1.data;
                } catch (error) {
                    console.log(error);
                }
                this.dateSent = '';
                this.tag = '';
                this.receiver = '';
                this.author = '';
                this.text = '';
                
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
            selectItem(item) {
                this.findauthor = "";
                this.findItem = item;
            },
            async deleteItem(item) {
                try {
                    await axios.delete("/api/items/" + item._id);
                    this.findItem = null;
                    this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
            async editItem(item) {
                try {
                    await axios.put("/api/items/" + item._id, {
                        author: this.findItem.author,
                        receiver: this.findItem.receiver,
                        dateSent: this.findItem.dateSent,
                        tag: this.findItem.tag,
                        text: this.findItem.text,
                        
                    });
                    this.findItem = null;
                    this.getItems();
                    return true;
                } catch (error) {
                    console.log(error);
                }
            },
        }
    }
</script>