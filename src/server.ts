import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'

const app = fastify()

export const config = {
    runtime: "edge"
}

app.register(fastifyCors, {
    origin: '*',
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