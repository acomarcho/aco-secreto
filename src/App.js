import { AppContextProvider } from "./AppContext"
import Form from "./Form";
import Header from "./Header";
import Contents from "./Contents";

const App = () => {
  return (
    <AppContextProvider>
      <div className="w-full bg-cyan min-h-screen">
        <div className="max-w-[1160px] p-8 mx-auto flex flex-col gap-8">
          <Form />
          <Header />
          <Contents />
        </div>
      </div>
    </AppContextProvider>
  );
};

export default App;
