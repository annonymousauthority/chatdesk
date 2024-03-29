'use client'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

export default function UploadDocumentComp({ handleFile }) {
  const [file, setFile] = useState(null)
  const [filetypeError, setFiletypeError] = useState('')

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
      ]
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile)
        handleFile(selectedFile)
      } else {
        setFiletypeError('Please upload a PDF, DOCX, or plain text file.')
        setTimeout(() => {
          setFiletypeError('')
        }, 2500)
      }
    }
  }
  return (
    <div className="col-span-full">
      <label htmlFor="cover-photo" className="text-xs text-gray-400">
        Upload Knowledge Book
      </label>
      <span className="text-sm text-green-500">{filetypeError}</span>
      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <BookOpenIcon
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Click to upload doc</span>
              <input
                id="file-upload"
                required
                name="file-upload"
                type="file"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
            <p className="pl-1">{file?.name}</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            docx, docx pdf, txt file
          </p>
        </div>
      </div>
    </div>
  )
}
