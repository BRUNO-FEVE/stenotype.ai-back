import { expect, test } from 'vitest'
import { Video } from '../../src/entites/video'
import { ObjectId } from 'mongodb'

test('create video', () => {
    const video = new Video({
        id: new ObjectId(),
        name:'audio.mp3',
        path:'/var/task/src/routes/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3',
        trasncription: 'Trascription',
        createAt: new Date()
    })

    expect(video).toBeInstanceOf(Video)
    expect(video.name).toEqual('audio.mp3')
})

test('invalid name', () => {
    expect(() => {
        new Video({
            id: new ObjectId(),
            name:'audio.mp8',
            path:'/var/task/src/routes/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp5',
            trasncription: 'Trascription',
            createAt: new Date()
        })
    }).toThrowError()
})

test('invalid path', () => {
    expect(() => {
        new Video({
            id: new ObjectId(),
            name:'audio.mp3',
            path:'/var/task/src/routes/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp5',
            trasncription: 'Trascription',
            createAt: new Date()
        })
    }).toThrowError()
})
