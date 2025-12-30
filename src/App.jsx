import { useState } from 'react'
import { useLogoSearch } from './hooks/useDebounce'
import { downloadLogo, getLogoExtension } from './services/logoService'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [downloadingId, setDownloadingId] = useState(null)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  
  const { logos, loading, error, searchTerm: debouncedSearchTerm } = useLogoSearch(searchTerm)

  const handleDownload = async (logo) => {
    try {
      setDownloadingId(logo.id)
      const extension = getLogoExtension(logo.url)
      const filename = `${logo.variant}-logo.${extension}`
      await downloadLogo(logo.url, filename)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Failed to download logo. Please try again.')
    } finally {
      setDownloadingId(null)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  const handleCopyUrl = async (logo) => {
    try {
      await navigator.clipboard.writeText(logo.url)
      setCopiedId(logo.id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
      alert('Failed to copy URL. Please try again.')
    }
  }

  const exampleSearches = ['React', 'GitHub', 'Node.js', 'Docker', 'Figma', 'MongoDB']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(51, 65, 85) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-24 pb-16 text-center">
          {/* Logo Display */}
          <div className="mb-12 flex justify-center">
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700" />
              
              {/* Logo container */}
              <div className="relative bg-white rounded-3xl p-12 shadow-lg border border-slate-200/60">
                <svg className="w-32 h-32 text-slate-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.2"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title & Tagline */}
          <h1 className="text-6xl md:text-7xl font-light text-slate-900 mb-6 tracking-tight">
            Logo<span className="font-semibold">Finder</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto mb-16 leading-relaxed">
            Discover and download premium logos with elegance and precision
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
              <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl opacity-0 blur transition-opacity duration-300 ${isSearchFocused ? 'opacity-20' : ''}`} />
              
              <input
                type="text"
                className="relative w-full px-8 py-5 text-lg bg-white border-2 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-300 transition-all duration-300 shadow-sm"
                placeholder="Search for any logo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                autoFocus
              />
              
              {searchTerm && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-600 transition-colors duration-200"
                  onClick={handleClearSearch}
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Search status */}
            {debouncedSearchTerm && (
              <div className="flex items-center justify-center gap-3 mt-4 text-slate-600 text-sm">
                <span>
                  Searching for: <strong className="text-slate-900">{debouncedSearchTerm}</strong>
                </span>
                {loading && (
                  <div className="animate-spin w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full"></div>
                )}
              </div>
            )}

            {/* Example searches - only show when no search term */}
            {!searchTerm && (
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                {exampleSearches.map((example) => (
                  <button
                    key={example}
                    className="px-5 py-2 text-sm text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-full transition-all duration-200 hover:shadow-sm bg-white/50"
                    onClick={() => setSearchTerm(example.toLowerCase())}
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-red-50 border border-red-200/60 rounded-2xl p-4 flex items-center gap-3 text-red-700">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && searchTerm && logos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-600">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mb-4"></div>
              <p className="text-lg">Searching for logos...</p>
            </div>
          )}

          {/* Features Grid - only show when no search */}
          {!searchTerm && (
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: 'Instant Access',
                  description: 'Real-time search across multiple premium sources'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'High Quality',
                  description: 'Vector formats for perfect scaling and clarity'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  ),
                  title: 'One Click',
                  description: 'Effortless downloads with no registration required'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl border border-slate-200/60 bg-white/40 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Results Section */}
        {!loading && logos.length > 0 && (
          <section className="container mx-auto px-6 pb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Found {logos.length} logo{logos.length !== 1 ? 's' : ''}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {logos.map((logo) => (
                <div 
                  key={logo.id} 
                  className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Logo Image */}
                  <div className="bg-slate-50 p-8 flex items-center justify-center h-40">
                    <img
                      src={logo.url}
                      alt={`${logo.variant} logo`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                  
                  {/* Logo Info */}
                  <div className="p-6">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2 capitalize">
                      {logo.variant}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {logo.source}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider">
                        {logo.type}
                      </span>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {/* Copy URL Button */}
                      <button
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          copiedId === logo.id
                            ? 'bg-green-500 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:shadow-md hover:-translate-y-0.5'
                        }`}
                        onClick={() => handleCopyUrl(logo)}
                        title="Copy logo URL"
                      >
                        {copiedId === logo.id ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copied!
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                          </>
                        )}
                      </button>

                      {/* Download Button */}
                      <button
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          downloadingId === logo.id
                            ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                            : 'bg-slate-900 hover:bg-slate-800 text-white hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                        onClick={() => handleDownload(logo)}
                        disabled={downloadingId === logo.id}
                        title="Download logo"
                      >
                        {downloadingId === logo.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                            Downloading...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* No Results */}
        {!loading && searchTerm && logos.length === 0 && debouncedSearchTerm && (
          <section className="container mx-auto px-6 pb-16">
            <div className="text-center py-16">
              <div className="text-6xl mb-6 opacity-30">🔍</div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">No logos found</h3>
              <p className="text-slate-600 mb-8">Try searching for:</p>
              <div className="bg-white rounded-2xl border border-slate-200/60 p-8 max-w-md mx-auto shadow-sm">
                <ul className="space-y-4 text-left">
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Popular frameworks: react, vue, angular
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Programming languages: javascript, python, java
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Tools & platforms: github, figma, docker
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Databases: mongodb, postgresql, mysql
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                Crafted by <span className="font-medium text-slate-900">Abhinav Bansal</span>
              </p>
              <a
                href="https://github.com/BansalAbhinav/QuickLogo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App