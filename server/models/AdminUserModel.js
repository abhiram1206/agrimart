import mongoose, { Schema } from "mongoose";

let profile_image_name_list = ['Pepper','Nala','Mittens','Sassy','Sugar','Socks','Bear','Garfield','Lucky','Gracie','Tinkerbell','Max','Midnight','Jack','Felix','Lily','Bandit','Milo','Lucy','Boots','Bailey','Chloe','Cuddles','Oscar','Annie','Luna','Kiki','Baby','Lola','Sasha','Zoey','Jack','Angel','Jasper','Misty','Sammy','Peanut','Kitty','Dusty','Casper','Lily','Boo']
let profile_image_collection_list = ['micah','notionists']

const AdminUserSchema = new Schema({
    AdminName: {
        type: String,
        required: true,
        unique: true
    },
    AdminEmail: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profile_img: {
        type: String,
        default: () => {
            return `https://api.dicebear.com/6.x/${profile_image_collection_list[Math.floor(Math.random() * profile_image_collection_list.length)]}/svg?seed=${profile_image_name_list[Math.floor(Math.random() * profile_image_name_list.length)]}`
        }
    }
})

export default mongoose.model('AdminUser', AdminUserSchema)