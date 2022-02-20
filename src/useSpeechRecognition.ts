import { useState, useEffect } from 'react'

type RecognitionType = {
  start: () => void
}

export const useSpeechRecognition = () => {
  const [recognition, setRecognition] = useState<RecognitionType | null>(null)
  const [diagnosticMessage, setDiagnosticMessage] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speech, setSpeech] = useState('')

  useEffect(() => {
    // @ts-ignore :(
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsPlaying(true)
      }

      recognition.onend = () => {
        setIsPlaying(false)
      }
      
      recognition.onresult = (event: { results: { transcript: any }[][] }) => {
        const word = event.results[0][0].transcript
        
        setSpeech(word)
      }

      recognition.onerror = () => {
        setDiagnosticMessage('ERROR')
        setIsPlaying(false)
      }

      setRecognition(recognition)
      setDiagnosticMessage('Press `start` and begin talking 😎')
    } else {
      setDiagnosticMessage('Speech Recognition not available on this browser')
    }
  }, [])

  return {
    diagnosticMessage,
    recognition,
    isPlaying,
    speech,
  }
}
