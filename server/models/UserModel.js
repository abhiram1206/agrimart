import mongoose, { Schema } from "mongoose"

let profile_image_name_list = ['Pepper','Nala','Mittens','Sassy','Sugar','Socks','Bear','Garfield','Lucky','Gracie','Tinkerbell','Max','Midnight','Jack','Felix','Lily','Bandit','Milo','Lucy','Boots','Bailey','Chloe','Cuddles','Oscar','Annie','Luna','Kiki','Baby','Lola','Sasha','Zoey','Jack','Angel','Jasper','Misty','Sammy','Peanut','Kitty','Dusty','Casper','Lily','Boo']
let profile_image_collection_list = ['micah','notionists']

const UserSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    MobileNum: {
        type: Number,
        required: true,
        unique: true,
    },
    City: {
        type: String,
        required: true,
    },
    Nationality: {
        type: String,
        default: "Indian"
    },
    password: {
        type: String,
        required: true,
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    profile_img:{
        type: String,
        default: () => {
            return `https://api.dicebear.com/6.x/${profile_image_collection_list[Math.floor(Math.random() * profile_image_collection_list.length)]}/svg?seed=${profile_image_name_list[Math.floor(Math.random() * profile_image_name_list.length)]}`
        }
    },
},{
    timestamps: {
        createdAt: 'joinedAt'
    }
})

export default mongoose.model('User', UserSchema)