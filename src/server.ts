import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'

const app = fastify()

app.register(fastifyCors, {
    origin: [
        // 'http://localhost:5173', // --> DEV
        'https://upload-ai-front-fevs.vercel.app/', 
        'https://upload-ai-front-git-master-fevs.vercel.app/', 
        'https://upload-ai-front-alpha.vercel.app/'
],
    credentials: true,
    methods: ['GET', 'POST']
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server Running! \n\nPORT:3333')
})