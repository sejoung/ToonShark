import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import WorkspacePage from '../pages/WorkspacePage'
import JobDetailPage from '../pages/JobDetailPage'
import PreviewPage from '../pages/PreviewPage'
import SliceDetailPage from '../pages/SliceDetailPage'
import SettingsPage from '../pages/SettingsPage'
import ExportPage from '../pages/ExportPage'
import { useSettingsStore } from '../stores/settingsStore'
import { I18nContext, getTranslations } from '../i18n'
import { ToastContainer } from '../components/ToastContainer'

export default function App() {
  const { settings, loadSettings } = useSettingsStore()

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  const locale = settings?.locale ?? 'en'
  const t = getTranslations(locale)

  return (
    <I18nContext.Provider value={t}>
      <div className="min-h-screen bg-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path="/job/:jobId/slice" element={<SliceDetailPage />} />
          <Route path="/job/:jobId/export" element={<ExportPage />} />
          <Route path="/preview/:jobId" element={<PreviewPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </I18nContext.Provider>
  )
}
