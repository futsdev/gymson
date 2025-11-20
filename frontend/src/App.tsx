import { Toaster } from "sonner"
import { ErrorBoundary } from "./components/error-boundary"
import RenderRoutes from "./routes/render-routes"
import { ThemeProvider } from "./components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RenderRoutes />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App