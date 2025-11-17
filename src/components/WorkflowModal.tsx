import React, { useState } from 'react'

interface WorkflowModalProps {
  isOpen: boolean
  onClose: () => void
}

const WorkflowModal: React.FC<WorkflowModalProps> = ({ isOpen, onClose }) => {
  const [workflowType, setWorkflowType] = useState<'existing' | 'new'>('existing')
  const [selectedWorkflow, setSelectedWorkflow] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')
  const [enableAcknowledgement, setEnableAcknowledgement] = useState(false)
  const [showFallback, setShowFallback] = useState(true)
  const [selectedFallback, setSelectedFallback] = useState<number | null>(null)
  const [fallbackWorkflow, setFallbackWorkflow] = useState('')
  const [inputVariables, setInputVariables] = useState<Array<{ key: string; value: string }>>([])
  const [outputVariables, setOutputVariables] = useState<Array<{ key: string; value: string }>>([])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div className="fixed right-0 top-0 h-full w-[420px] bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Start with workflow</h2>
            <p className="text-sm text-gray-500 mt-1">Shortcut: @workflow</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Workflow Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workflow
            </label>
            <div className="flex space-x-2 mb-3">
              <button
                onClick={() => setWorkflowType('existing')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  workflowType === 'existing'
                    ? 'bg-purple-50 border-purple-500 text-purple-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Select existing
              </button>
              <button
                onClick={() => setWorkflowType('new')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  workflowType === 'new'
                    ? 'bg-purple-50 border-purple-500 text-purple-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Create new
              </button>
            </div>
            {workflowType === 'existing' ? (
              <select
                value={selectedWorkflow}
                onChange={(e) => setSelectedWorkflow(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select a workflow...</option>
                <option value="workflow1">Refund Status Check</option>
                <option value="workflow2">Booking Verification</option>
                <option value="workflow3">Payment Processing</option>
              </select>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-3">
                  Inputs & outputs are not configured
                </p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">
                  Define workflow
                </button>
              </div>
            )}
          </div>

          {/* Acknowledgement Message Section */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-gray-900">
                ACKNOWLEDGEMENT MESSAGE
              </h3>
              <button
                type="button"
                onClick={() => setEnableAcknowledgement(!enableAcknowledgement)}
                className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                style={{
                  backgroundColor: enableAcknowledgement ? '#9333ea' : '#d1d5db',
                  border: '2px solid #374151',
                  boxSizing: 'border-box',
                }}
                role="switch"
                aria-checked={enableAcknowledgement}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    enableAcknowledgement ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Acknowledgement message during workflow execution
            </p>
            {enableAcknowledgement && (
              <textarea
                value={loadingMessage}
                onChange={(e) => setLoadingMessage(e.target.value)}
                placeholder="e.g., Processing your request..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm resize-none"
              />
            )}
          </div>

          {/* Store Output Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              STORE OUTPUT FROM WORKFLOW
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Store the workflow's output in variables to use in the conversation
            </p>
            <div className="space-y-2">
              {outputVariables.map((variable, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={variable.key}
                    onChange={(e) => {
                      const newVars = [...outputVariables]
                      newVars[index].key = e.target.value
                      setOutputVariables(newVars)
                    }}
                    placeholder="Variable name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <input
                    type="text"
                    value={variable.value}
                    onChange={(e) => {
                      const newVars = [...outputVariables]
                      newVars[index].value = e.target.value
                      setOutputVariables(newVars)
                    }}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <button
                    onClick={() => {
                      setOutputVariables(outputVariables.filter((_, i) => i !== index))
                    }}
                    className="px-3 py-2 text-gray-400 hover:text-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => setOutputVariables([...outputVariables, { key: '', value: '' }])}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-purple-500 hover:text-purple-600 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add output variable
              </button>
            </div>
            {outputVariables.length > 0 && (
              <p className="text-xs text-red-600 mt-2 flex items-center">
                <span className="mr-1">▲</span>
                Some errors related to output node found
              </p>
            )}
          </div>

          {/* Input Variables Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              INPUT VARIABLES
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Define variables to pass to the workflow
            </p>
            <div className="space-y-2">
              {inputVariables.map((variable, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={variable.key}
                    onChange={(e) => {
                      const newVars = [...inputVariables]
                      newVars[index].key = e.target.value
                      setInputVariables(newVars)
                    }}
                    placeholder="Variable name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <input
                    type="text"
                    value={variable.value}
                    onChange={(e) => {
                      const newVars = [...inputVariables]
                      newVars[index].value = e.target.value
                      setInputVariables(newVars)
                    }}
                    placeholder="Value"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                  />
                  <button
                    onClick={() => {
                      setInputVariables(inputVariables.filter((_, i) => i !== index))
                    }}
                    className="px-3 py-2 text-gray-400 hover:text-red-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                onClick={() => setInputVariables([...inputVariables, { key: '', value: '' }])}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-purple-500 hover:text-purple-600 flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add input variable
              </button>
            </div>
          </div>

          {/* Fallback Configuration */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <button
              onClick={() => setShowFallback(!showFallback)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-all duration-200"
            >
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">FALLBACK</h3>
              <svg
                className={`w-5 h-5 text-gray-400 transition-all duration-200 ${showFallback ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showFallback && (
              <div className="px-5 pb-5 pt-1 space-y-8 border-t border-gray-100">
                {/* Step 1 */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4 flex-shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                      1
                    </div>
                    <div className="w-px bg-gradient-to-b from-gray-300 to-gray-200 mt-3 flex-1" style={{ minHeight: '90px' }}></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                        Send AI-powered apology
                      </h4>
                      <button
                        type="button"
                        onClick={() => setSelectedFallback(selectedFallback === 1 ? null : 1)}
                        disabled={selectedFallback !== null && selectedFallback !== 1}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 ${
                          selectedFallback !== null && selectedFallback !== 1 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        style={{
                          backgroundColor: selectedFallback === 1 ? '#9333ea' : '#d1d5db',
                          border: '2px solid #374151',
                          boxSizing: 'border-box',
                        }}
                        role="switch"
                        aria-checked={selectedFallback === 1}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            selectedFallback === 1 ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      If the workflow fails, an AI-powered apology is automatically sent to the customer (e.g., "Sorry, I'm having trouble fetching plans right now.").
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4 flex-shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                      2
                    </div>
                    <div className="w-px bg-gradient-to-b from-gray-300 to-gray-200 mt-3 flex-1" style={{ minHeight: '90px' }}></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                        Bypass workflow and move to next step
                      </h4>
                      <button
                        type="button"
                        onClick={() => setSelectedFallback(selectedFallback === 2 ? null : 2)}
                        disabled={selectedFallback !== null && selectedFallback !== 2}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 ${
                          selectedFallback !== null && selectedFallback !== 2 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        style={{
                          backgroundColor: selectedFallback === 2 ? '#9333ea' : '#d1d5db',
                          border: '2px solid #374151',
                          boxSizing: 'border-box',
                        }}
                        role="switch"
                        aria-checked={selectedFallback === 2}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            selectedFallback === 2 ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Executes the fallback configured for super agent
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start">
                  <div className="flex flex-col items-center mr-4 flex-shrink-0">
                    <div className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                      3
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-2.5">
                      <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                        Configure fallback
                      </h4>
                      <button
                        type="button"
                        onClick={() => setSelectedFallback(selectedFallback === 3 ? null : 3)}
                        disabled={selectedFallback !== null && selectedFallback !== 3}
                        className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 ${
                          selectedFallback !== null && selectedFallback !== 3 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        style={{
                          backgroundColor: selectedFallback === 3 ? '#9333ea' : '#d1d5db',
                          border: '2px solid #374151',
                          boxSizing: 'border-box',
                        }}
                        role="switch"
                        aria-checked={selectedFallback === 3}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            selectedFallback === 3 ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      Set up a custom fallback to execute when the main workflow fails
                    </p>
                    {selectedFallback === 3 && (
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Select workflow/superagent fallback
                        </label>
                        <select
                          value={fallbackWorkflow}
                          onChange={(e) => setFallbackWorkflow(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-white"
                        >
                          <option value="">Select a workflow...</option>
                          <option value="workflow1">Refund Status Check</option>
                          <option value="workflow2">Booking Verification</option>
                          <option value="workflow3">Payment Processing</option>
                          <option value="workflow4">Customer Support</option>
                          <option value="workflow5">Order Cancellation</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default WorkflowModal

