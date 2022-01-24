import { useSpeechRecognition } from './useSpeechRecognition'
import './App.css'

function App() {
  const { diagnosticMessage, recognition, speech } = useSpeechRecognition()
  
  const handleStartRecognition = () => {
    if (recognition) {
      recognition.start()
    }
  }

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center text-center">
      <p className={`mt-6 text-3xl font-bold
        ${diagnosticMessage === 'ERROR' ? 'text-red-600' : 'text-white'}
      `}>
        {diagnosticMessage}
      </p>
      <div className="mt-6 text-white">
        <button onClick={handleStartRecognition} className="border border-solid rounded-lg py-2 px-4 mr-4">▷ start</button>
        <button className="border border-solid rounded-lg py-2 px-4">□ stop</button>
      </div>
      <div className="mt-6 font-bold">
        <p>{speech}</p>
      </div>
    </div>
  )
}

export default App
