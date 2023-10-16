import { expect, test } from 'vitest'
import { Video } from '../../src/entites/video'


test('create a new video', () => {
    const video = new Video({
        name:'audio.mp3',
        path:'/var/task/src/use-cases/crete-video/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3',
        transcription: 'Trascription',
    })

    expect(video).toBeInstanceOf(Video)
    expect(video.id).toBeDefined()
    expect(video.createAt).toBeDefined()
})

test('create video based on old video', () => {
    const video = new Video({
        id: "652cb2b17e1c9163bd794253",
        name:'audio.mp3',
        path:'/var/task/src/use-cases/crete-video/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3',
        transcription: 'Trascription',
        createAt: new Date()
    })

    expect(video).toBeInstanceOf(Video)
    expect(video.name).toEqual('audio.mp3')
})

test('invalid name', () => {
    expect(() => {
        new Video({
            name:'audio.mp4',
            path:'/var/task/src/use-cases/crete-video/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp3',
            transcription: 'Trascription',
        })
    }).toThrowError()
})

test('invalid path', () => {
    expect(() => {
        new Video({
            name:'audio.mp3',
            path:'/var/task/src/routes/tmp/audio-8dbff461-ee43-4028-bf3d-233a5855acc5.mp4',
            transcription: 'Trascription',
        })
    }).toThrowError()
})
