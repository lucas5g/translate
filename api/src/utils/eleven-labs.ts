import { env } from './env';
import { ElevenLabsClient } from 'elevenlabs';


export async function elevenLabs(text: string) {
  const client = new ElevenLabsClient();
  if (text === 'test') {
    return Buffer.from('test');
  }
  const audio = await client.textToSpeech.convert(
    'nPczCjzI2devNBz1zQrb',
    {
      text: `${text}.`,
      model_id: 'eleven_multilingual_v2',
      output_format: 'mp3_44100_128',
      voice_settings: {
        speed: 0.8
      }
    },
    {
      apiKey: env.ELEVENLABS_API_KEY,
    },
  );

  const audioChunks: Buffer[] = [];

  for await (const chunk of audio) {
    audioChunks.push(chunk);
  }

  const audioBuffer = Buffer.concat(audioChunks);

  return audioBuffer;
}