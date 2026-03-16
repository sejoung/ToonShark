import type { JobMeta } from '@shared/types'
import type { TranslationKeys } from '../i18n/en'
import { toLocalFileUrl } from '@shared/utils'

function OptionTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1.5 py-0.5 bg-slate-700 rounded text-[10px] text-slate-300">
      {children}
    </span>
  )
}

function OptionsSummary({ job, t }: { job: JobMeta; t: TranslationKeys }) {
  const { options, mode } = job
  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      <OptionTag>{mode === 'fixed' ? t.fixed : t.auto}</OptionTag>
      {mode === 'fixed' && options.sliceHeight != null && (
        <OptionTag>{options.sliceHeight}px</OptionTag>
      )}
      {mode === 'fixed' && options.startOffset != null && options.startOffset > 0 && (
        <OptionTag>offset {options.startOffset}</OptionTag>
      )}
      {mode === 'auto' && options.whiteThreshold != null && (
        <OptionTag>threshold {options.whiteThreshold}</OptionTag>
      )}
      {mode === 'auto' && options.minWhiteRun != null && (
        <OptionTag>minRun {options.minWhiteRun}</OptionTag>
      )}
      {mode === 'auto' && options.minSliceHeight != null && (
        <OptionTag>minH {options.minSliceHeight}</OptionTag>
      )}
      {mode === 'auto' && options.cutPosition && (
        <OptionTag>{options.cutPosition === 'middle' ? t.cutMiddle : t.cutBeforeColor}</OptionTag>
      )}
      {options.pdfScale != null && (
        <OptionTag>{options.pdfScale}x</OptionTag>
      )}
      <OptionTag>{job.prefix}</OptionTag>
    </div>
  )
}

export function JobResultCard({
  job,
  navigate,
  onDelete,
  t
}: {
  job: JobMeta
  navigate: (path: string) => void
  onDelete: (jobId: string) => Promise<void>
  t: TranslationKeys
}) {
  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm">
          <span className="text-white font-medium">
            {new Date(job.createdAt).toLocaleTimeString()}
          </span>
          <span className="text-slate-400 ml-3">{t.slices(job.sliceCount)}</span>
          <span className="text-slate-400 ml-3">{job.pageCount} {t.pages}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/preview/${job.id}`)}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded text-xs transition"
          >
            {t.preview}
          </button>
          <button
            onClick={() => window.api.openSourcePdf(job.id).catch(() => {})}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition"
          >
            {t.sourcePdf}
          </button>
          <button
            onClick={() => window.api.openPath(job.versionPath).catch(() => {})}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition"
          >
            {t.folder}
          </button>
          <button
            onClick={() => navigate(`/job/${job.id}`)}
            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs transition"
          >
            {t.detail}
          </button>
          <button
            onClick={() => navigate(`/job/${job.id}/export`)}
            className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 rounded text-xs transition"
          >
            {t.exportButton}
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="px-3 py-1 bg-red-900/50 hover:bg-red-700 text-red-300 hover:text-white rounded text-xs transition"
          >
            {t.delete}
          </button>
        </div>
      </div>

      <OptionsSummary job={job} t={t} />

      <div className="flex gap-2 overflow-x-auto pb-2 mt-3">
        {job.files.slice(0, 12).map((file) => (
          <button
            key={file.index}
            onClick={() => navigate(`/job/${job.id}/slice?index=${file.index}&from=workspace`)}
            className="flex-shrink-0 w-16 bg-slate-700 rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
          >
            <img
              src={toLocalFileUrl(file.thumbnailPath ?? file.path)}
              alt={file.name}
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
            />
            <div className="text-center py-0.5">
              <span className="text-[10px] text-slate-500">{file.index}</span>
            </div>
          </button>
        ))}
        {job.files.length > 12 && (
          <button
            onClick={() => navigate(`/job/${job.id}`)}
            className="flex-shrink-0 w-16 bg-slate-700 rounded flex items-center justify-center text-xs text-slate-400 cursor-pointer hover:bg-slate-600 transition"
          >
            +{job.files.length - 12}
          </button>
        )}
      </div>
    </div>
  )
}
