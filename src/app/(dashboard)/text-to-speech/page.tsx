import TextToSpeechView from '@/features/text-to-speech/views/text-to-speech-view';
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = { title: "Text to Speech" };

const TextToSpeech = () => {
  return (
    <TextToSpeechView />
  )
}

export default TextToSpeech