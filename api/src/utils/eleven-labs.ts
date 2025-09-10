import { env } from './env';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';


export async function elevenLabs(text: string) {
  if (text === 'test') {
    return Buffer.from('test');
  }

  const elevenlabs = new ElevenLabsClient({
    apiKey: env.ELEVEN_LABS_API_KEY
});

  const audio = await elevenlabs.textToSpeech.convert(
    'nPczCjzI2devNBz1zQrb',
    {
      text: `${text}.`,
      modelId: 'eleven_multilingual_v2',
      outputFormat: 'mp3_44100_128',
      voiceSettings: {
        speed: 0.8
      }
    }
    

  );

  const audioChunks: Uint8Array[] = [];

  for await (const chunk of audio) {
    audioChunks.push(chunk);
  }

  console.log('oioite')

  const audioBuffer = Buffer.concat(audioChunks);

  return audioBuffer;
}