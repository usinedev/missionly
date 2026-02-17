import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRouter />
    </>
  );
}

export default App;