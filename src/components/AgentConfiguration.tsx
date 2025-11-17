import React, { useState } from 'react'
import WorkflowModal from './WorkflowModal'

const AgentConfiguration: React.FC = () => {
  const [startTrigger, setStartTrigger] = useState("When user says 'I want to apply for a loan' or asks about loan application process")
  const [runWorkflow, setRunWorkflow] = useState(false)
  const [showWorkflowModal, setShowWorkflowModal] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [charCount, setCharCount] = useState(0)

  const handleToggleWorkflow = () => {
    const newValue = !runWorkflow
    setRunWorkflow(newValue)
    if (newValue) {
      setShowWorkflowModal(true)
    }
  }

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setPrompt(value)
    setCharCount(value.length)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Start trigger Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start trigger</h2>
        <p className="text-gray-600 mb-4">
          Define the initial trigger or condition that starts this conversation flow.
        </p>
        <textarea
          value={startTrigger}
          onChange={(e) => setStartTrigger(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
          rows={3}
          placeholder="Enter the start trigger..."
        />
      </div>

      {/* Call workflow Section */}
      <div className="mb-8 border-2 border-gray-300 bg-gray-50 p-4 rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Start with workflow</h2>
          <button
            type="button"
            onClick={handleToggleWorkflow}
            className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            style={{
              backgroundColor: runWorkflow ? '#9333ea' : '#d1d5db',
              border: '2px solid #374151',
              boxSizing: 'border-box',
            }}
            role="switch"
            aria-checked={runWorkflow}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                runWorkflow ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Prompt Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Prompt</h2>
        <p className="text-gray-600 mb-4">
          Each step is part of one conversation flow. Add clear instructions to guide users smoothly through each stage.
        </p>

        {/* Step 1 Tab */}
        <div className="mb-0">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-t-lg font-medium text-sm">
            Step 1
          </button>
        </div>

        {/* Prompt Textarea */}
        <div className="relative border-2 border-purple-500 rounded-b-lg rounded-tr-lg">
          <textarea
            value={prompt}
            onChange={handlePromptChange}
            className="w-full px-4 py-4 border-0 focus:ring-0 focus:outline-none resize-none rounded-b-lg rounded-tr-lg"
            rows={12}
            placeholder="Write instructions on how to handle this usecase"
            maxLength={1000}
          />
          <div className="absolute bottom-4 right-4 text-sm text-gray-500">
            {charCount}/1000
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 mt-4">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 12l10 10 10-10L12 2z"/>
            </svg>
            <span>Ask AI</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span>&lt; &gt; Actions</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span>Variables</span>
          </button>
        </div>

        {/* Add Step Button */}
        <div className="mt-6">
          <button className="px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg font-medium hover:border-purple-500 hover:text-purple-600 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>+ Add step</span>
          </button>
        </div>
      </div>

      {/* Workflow Modal */}
      <WorkflowModal
        isOpen={showWorkflowModal}
        onClose={() => {
          setShowWorkflowModal(false)
          // Optionally turn off toggle when modal is closed
          // setRunWorkflow(false)
        }}
      />
    </div>
  )
}

export default AgentConfiguration

