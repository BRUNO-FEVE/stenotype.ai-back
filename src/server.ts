import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'
import { getVideo } from './routes/get-video'

const app = fastify()

export const config = { supportsResponseStreaming: true, }

app.register(fastifyCors, {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST']
})

app.register(getAllPromptsRoute)
app.register(getVideo)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAiCompletionRoute)

app.listen({
    port: 3333
}).then(() => {
    console.log('HTTP Server Running! \n\nPORT:3333')
})