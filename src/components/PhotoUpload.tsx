'use client';

import { ChangeEvent, useState } from 'react';
import { ALLOWED_TYPES, MAX_FILE_SIZE_BYTES } from '@/lib/upload-config';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function PhotoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setErrorMessage(`Filetype not allowed: ${selectedFile.type}`);
      setStatus('error');
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`Huge file (max ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB)`);
      setStatus('error');
      return;
    }

    setFile(selectedFile);
    setErrorMessage(null);
    uploadFile(selectedFile);
  }

  async function uploadFile(fileToUpload: File) {
    setStatus('uploading');

    try {
      const urlRes = await fetch('/api/upload-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: fileToUpload.type,
          fileName: fileToUpload.name,
          contentLength: fileToUpload.size,
        }),
      });

      if (!urlRes.ok) {
        // Server-side issue (bad credentials, S3 misconfig, etc).
        // Not the user's fault and not actionable for them, so we just log it.
        console.error('Failed to generate upload URL:', urlRes.status);
        setStatus('error');
        return;
      }

      const { uploadUrl } = await urlRes.json();

      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': fileToUpload.type },
        body: fileToUpload,
      });

      if (!uploadRes.ok) {
        setErrorMessage('Upload failed. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }

  return (
    <div>
      <label htmlFor="photo-upload">Upload photo</label>
      <input
        id="photo-upload"
        type="file"
        onChange={handleFileChange}
        disabled={status === 'uploading'}
      />

      {file && <p>Selected: {file.name}</p>}
      {status === 'uploading' && <p>Uploading...</p>}
      {status === 'success' && <p>Upload complete!</p>}
      {status === 'error' && <p>{errorMessage ?? 'Something went wrong. Please try again.'}</p>}
    </div>
  );
}