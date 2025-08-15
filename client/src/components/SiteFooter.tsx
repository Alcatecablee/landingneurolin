export function SiteFooter() {
  return (
    <footer className="w-full py-12 px-4 mt-auto bg-black border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://app.neurolint.dev/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Developer Tools</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.npmjs.com/package/@neurolint/cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  CLI Tool
                </a>
              </li>
              <li>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=neurolint.neurolint-vscode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  VS Code Extension
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/docs#cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  CLI Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/docs#api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  API Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://app.neurolint.dev/docs#getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Getting Started
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/docs#layers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  7-Layer Engine Guide
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/docs#tutorials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Tutorials
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/docs#faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:founder@neurolint.com"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="https://app.neurolint.dev/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/neurolint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <span>&copy; {new Date().getFullYear()} NeuroLint.</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span>All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
            <span className="text-zinc-400">Ready to modernize your code?</span>
          <a
              href="https://app.neurolint.dev/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            className="text-white font-medium hover:text-zinc-300 transition-colors px-3 py-1 bg-zinc-800/50 hover:bg-zinc-800 rounded-full"
          >
              Get Started Free
          </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
