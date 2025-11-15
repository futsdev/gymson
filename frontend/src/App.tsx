import { Toaster } from "sonner"
import { ErrorBoundary } from "./components/error-boundary"
import RenderRoutes from "./routes/render-routes"
import { ThemeProvider } from "./components/theme-provider"

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RenderRoutes />
        <Toaster position="top-center" richColors />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App