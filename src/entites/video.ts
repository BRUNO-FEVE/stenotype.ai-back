import { ObjectId } from "mongodb"

interface VideoProps {
    id: ObjectId
    name: string
    path: string
    trasncription?: string
    createAt: Date
}

export class Video {

    private props: VideoProps

    constructor(props: VideoProps) {
        const { id, name, path } = props

        const objectIdValidationResponse = Video.validateObjectId(id)
        if (!objectIdValidationResponse) {
            throw new Error('Invalid ID: ' + id)
        }

        const nameValidationResponse = Video.validateName(name)
        if (!nameValidationResponse) {
            throw new Error('Invalid Name: ' + name)
        }

        const pathValidationResponse = Video.validatePath(path)
        if (!pathValidationResponse) {
            throw new Error('Invalid Path: ' + path)
        }

        this.props = props
    }

    get id (): ObjectId {
        return this.props.id
    }

    get name () {
        return this.props.name
    }

    get path () {
        return this.props.path
    }

    get trasncription () {
        return this.props.trasncription
    }

    get createAt () {
        return this.props.createAt
    }

    set id (id: ObjectId) {
        const validationResponse = Video.validateObjectId(id)
        if (validationResponse) {
            this.props.id = id    
        }
        throw new Error('Invalid ID: ' + id)
    }

    set name (name: string) {
        const valiadationResponse = Video.validateName(name)
        if (valiadationResponse) {
            this.props.name = name    
        }
        throw new Error('Invalid Name: ' + name)
    }

    set path (path: string) {
        const validationResponse = Video.validatePath(path)
        if (validationResponse) {
            this.props.path = path    
        }
        throw new Error('Invalid Path: ' + path)
    }

    set trasncription (transcription: string) {
        this.props.trasncription = transcription
    }

    set createAt (createAt: Date) {
        this.props.createAt = createAt
    }

    static validateObjectId(id: ObjectId) {
        const validationResponse = ObjectId.isValid(id)
        return validationResponse
    }

    static validateName(name: string) {
        // eslint-disable-next-line no-useless-escape
        if(name.match('[A-Za-z]+\.mp3')) {
            return true
        }
        return false
    }

    static validatePath(path: string) {
        // eslint-disable-next-line no-useless-escape
        if (path.match('/var/task/src/routes/tmp/([A-Za-z0-9]+(-[A-Za-z0-9]+)+)\.mp3')) {
            return true
        }
        return false
    }

}