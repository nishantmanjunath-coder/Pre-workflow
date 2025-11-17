import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AgentConfiguration from './components/AgentConfiguration'

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <AgentConfiguration />
        </main>
      </div>
    </div>
  )
}

export default App

