"use client";
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface JournalEntry {
  date: string;
  type: 'checkin' | 'writing' | 'affirmation' | 'activity';
  content?: string;
  mood?: string;
  reflection?: string;
  activity?: string;
  completed?: boolean;
  timestamp?: string;
}

export default function DataManager() {
  const { user } = useAuth();

  const [importData, setImportData] = useState<string>('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const getAllJournalData = (): JournalEntry[] => {
    if (typeof window === 'undefined') return [];
    
    const entries: JournalEntry[] = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('innerspace_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          const dateMatch = key.match(/(\d{4}-\d{1,2}-\d{1,2})/);
          const date = dateMatch ? dateMatch[1] : new Date().toISOString().split('T')[0];
          
          let type: 'checkin' | 'writing' | 'affirmation' | 'activity' = 'writing';
          if (key.includes('checkin')) type = 'checkin';
          else if (key.includes('affirmation')) type = 'affirmation';
          else if (key.includes('activity')) type = 'activity';
          
          entries.push({
            date,
            type,
            content: data.content,
            mood: data.mood,
            reflection: data.reflection,
            activity: data.activity,
            completed: data.completed,
            timestamp: data.timestamp
          });
        } catch (error) {
          console.error('Error parsing entry:', key, error);
        }
      }
    });
    
    return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const handleExport = () => {
    try {
      const data = {
        user: user ? {
          id: user.id,
          email: user.email,
          username: user.user_metadata?.username
        } : null,
        entries: getAllJournalData(),
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
      
                   const jsonString = JSON.stringify(data, null, 2);
             setExportStatus('success');
      
      // Create and download file
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `innerspace-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Export error:', error);
      setExportStatus('error');
    }
  };

  const handleImport = () => {
    try {
      const data = JSON.parse(importData);
      
      if (!data.entries || !Array.isArray(data.entries)) {
        throw new Error('Invalid data format');
      }
      
      // Clear existing data (optional - could be made configurable)
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('innerspace_')) {
          localStorage.removeItem(key);
        }
      });
      
      // Import entries
      data.entries.forEach((entry: JournalEntry) => {
        const key = `innerspace_${entry.type}_${entry.date}`;
        const dataToStore: any = {};
        
        if (entry.content) dataToStore.content = entry.content;
        if (entry.mood) dataToStore.mood = entry.mood;
        if (entry.reflection) dataToStore.reflection = entry.reflection;
        if (entry.activity) dataToStore.activity = entry.activity;
        if (entry.completed !== undefined) dataToStore.completed = entry.completed;
        if (entry.timestamp) dataToStore.timestamp = entry.timestamp;
        
        localStorage.setItem(key, JSON.stringify(dataToStore));
      });
      
      setImportStatus('success');
      setImportData('');
      
      // Refresh the page to show imported data
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      
    } catch (error) {
      console.error('Import error:', error);
      setImportStatus('error');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setImportData(content);
      };
      reader.readAsText(file);
    }
  };

  const getStats = () => {
    const entries = getAllJournalData();
    return {
      total: entries.length,
      checkins: entries.filter(e => e.type === 'checkin').length,
      writings: entries.filter(e => e.type === 'writing').length,
      affirmations: entries.filter(e => e.type === 'affirmation').length,
      activities: entries.filter(e => e.type === 'activity').length
    };
  };

  const stats = getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {user ? `${user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous'}'s Data` : 'Your Data'}
        </h2>
        <p className="text-gray-600">Export and import your journal entries</p>
      </div>

      {/* Data Statistics */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.checkins}</div>
            <div className="text-sm text-gray-600">Check-ins</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.writings}</div>
            <div className="text-sm text-gray-600">Journal Entries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.affirmations}</div>
            <div className="text-sm text-gray-600">Affirmations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.activities}</div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">📤</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Export Your Data</h3>
            <p className="text-sm text-gray-600">Download a backup of all your journal entries</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={handleExport}
            disabled={stats.total === 0}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              stats.total === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {stats.total === 0 ? 'No Data to Export' : `Export ${stats.total} Entries`}
          </button>
          
          {exportStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">✅ Export successful! File downloaded.</p>
            </div>
          )}
          
          {exportStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">❌ Export failed. Please try again.</p>
            </div>
          )}
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">📥</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Import Data</h3>
            <p className="text-sm text-gray-600">Restore your journal entries from a backup file</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload JSON file or paste data:
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or paste JSON data here:
            </label>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder="Paste your exported JSON data here..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
          
          <button
            onClick={handleImport}
            disabled={!importData.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              !importData.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            Import Data
          </button>
          
          {importStatus === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-green-700 text-sm">✅ Import successful! Page will refresh to show your data.</p>
            </div>
          )}
          
          {importStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">❌ Import failed. Please check your data format.</p>
            </div>
          )}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 text-lg">⚠️</div>
          <div>
            <h4 className="font-medium text-yellow-800 mb-1">Important Notes</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Export creates a backup file with all your journal entries</li>
              <li>• Import will replace all existing data (backup first!)</li>
              <li>• Data is stored locally and never shared with others</li>
              <li>• Keep your backup files safe and secure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 