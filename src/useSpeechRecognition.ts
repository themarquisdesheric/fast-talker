import { useState, useEffect } from 'react'

type RecognitionType = {
  start: () => void
}

export const useSpeechRecognition = () => {
  const [diagnosticMessage, setDiagnosticMessage] = useState('')
  const [recognition, setRecognition] = useState<RecognitionType | null>(null)
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
      // @ts-ignore
      recognition.onresult = (event) => {
        const word = event.results[0][0].transcript
        
        setSpeech(word)
      }

      recognition.onend = () => {
        setDiagnosticMessage('speech has ended')
      }

      recognition.onError = () => {
        setDiagnosticMessage('ERROR')
      }

      setRecognition(recognition)
      setDiagnosticMessage('Speech Recognition available! Press `start` and begin talking 😎')
    } else {
      setSpeech('Speech Recognition not available on this browser')
    }
  }, [])

  return {
    diagnosticMessage,
    recognition,
    speech,
  }
}
