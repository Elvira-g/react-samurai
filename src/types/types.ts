export type PostsType = {
    id: number
    message: string
    likesCount: number
}

export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfilePhotosType = {
    small: string
    large: string
}

export type ProfileType = {
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
}

export type UserType = {
    name: string
    id: number | null
    photos: ProfilePhotosType
    status: string | null,
    followed: boolean
}
