import { useSpeechRecognition } from './useSpeechRecognition'
import './App.css'

function App() {
  const { diagnosticMessage, recognition, isPlaying, speech } = useSpeechRecognition()
  
  const handleStartRecognition = () => {
    if (recognition) {
      recognition.start()
    }
  }

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center text-center">
      {speech && (
        <div className="mt-6 font-bold">
          <p>{speech}</p>
        </div>
      )}
      {!isPlaying && (
        <p className={`mt-6 text-3xl font-bold
          ${diagnosticMessage === 'ERROR' ? 'text-red-600' : 'text-white'}
        `}>
          {diagnosticMessage}
        </p>
      )}
      {recognition && 
        <>
          <div className="mt-6 text-white">
            <button onClick={handleStartRecognition} className="border border-solid rounded-lg py-4 px-6">
              <img src="/mic.svg" alt="microphone icon" />
              <span className="inline-block mt-1">start</span>
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default App
