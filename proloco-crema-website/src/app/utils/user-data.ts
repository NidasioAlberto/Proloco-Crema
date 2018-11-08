export interface UserData {
    associations?: string[]
}

/**
 * This interface contains the data inside the associations attribute of the user data
 */
export interface Association {
    id?: string
    role?: 'admin'
    name: string
    city: string
}